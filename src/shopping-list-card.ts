import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "./ha-types.js";

import { CARD_TAG, CARD_VERSION, DEFAULT_CONFIG, EDITOR_TAG } from "./const.js";
import { DEFAULT_CATEGORY_COLORS, parseCategory } from "./categories.js";
import { clampQuantity, formatQuantity, parseQuantity } from "./quantity.js";
import type { ShoppingListCardConfig, TodoItem, PendingOperation } from "./types.js";
import { cardStyles } from "./styles.js";

interface CategoryGroup {
  key: string;
  category: string | null;
  displayName: string;
  active: TodoItem[];
  completed: TodoItem[];
}

const GENERAL_GROUP_KEY = "__general__";

import "./shopping-list-card-editor.js";

const win = window as unknown as {
  customCards?: Array<{
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
  }>;
};
win.customCards = win.customCards || [];
if (!win.customCards.find((c) => c.type === CARD_TAG)) {
  win.customCards.push({
    type: CARD_TAG,
    name: "Shopping List Card",
    description:
      "A shopping-style list view for any todo entity, with categories, quantities, offline support, and drag-and-drop reorder.",
    preview: true,
    documentationURL: "https://github.com/ksmarty/ha-shopping-list",
  });
}

console.info(
  `%c SHOPPING-LIST-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;",
);

@customElement(CARD_TAG)
export class ShoppingListCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ShoppingListCardConfig;
  @state() private _items: TodoItem[] = [];
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _draft = "";
  @state() private _completedExpanded = false;
  @state() private _editingUid?: string;
  @state() private _editDraft = "";
  @state() private _editQuantity = 1;
  @state() private _addQuantity = 1;
  @state() private _collapsedCategories: Set<string> = new Set();
  @state() private _connected = true;
  @state() private _offlineQueue: PendingOperation[] = [];
  @state() private _draggedUid: string | null = null;
  private _dropPosition: "above" | "below" = "above";
  private _resizeHandler: (() => void) | null = null;
  private _touchDragUid: string | null = null;

  private _unsub?: () => void;
  private _lastEntity?: string;
  private _focusEditOnUpdate = false;
  private _connectionUnsubs: Array<() => void> = [];
  private _itemOrder: string[] = [];

  static styles = cardStyles;

  public static getStubConfig(): ShoppingListCardConfig {
    return { ...DEFAULT_CONFIG };
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TAG) as unknown as LovelaceCardEditor;
  }

  public setConfig(config: ShoppingListCardConfig): void {
    if (!config) throw new Error("Invalid configuration");

    const migrated: ShoppingListCardConfig = { ...config };
    if (migrated.completed === undefined && migrated.show_completed !== undefined) {
      migrated.completed = migrated.show_completed ? "inline" : "hide";
    }

    this._config = { ...DEFAULT_CONFIG, ...migrated };
    this._loadItemOrder();
  }

  public getCardSize(): number {
    const base = this._config?.show_header ? 2 : 1;
    return base + Math.min(this._items.length, 6);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownSubscription();
    this._teardownConnectionMonitoring();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);

    if (this._focusEditOnUpdate) {
      const input = this.renderRoot.querySelector(".sl-edit-input") as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
        this._focusEditOnUpdate = false;
      }
    }

    if (changed.has("_config") && this._config) {
      if (this._config.fill_screen) {
        this._setupFillScreen();
      } else {
        this._teardownFillScreen();
      }
    }

    const entity = this._config?.entity;
    if (!entity || !this.hass) return;
    if (entity !== this._lastEntity) {
      this._lastEntity = entity;
      void this._setupSubscription(entity);
      this._setupConnectionMonitoring();
    }
  }

  /* --- Fill screen --- */

  private _updateFillScreenHeight(): void {
    const rect = this.getBoundingClientRect();
    const available = window.innerHeight - rect.top;
    this.style.setProperty("--shopping-list-host-height", `${Math.max(200, available)}px`);
  }

  private _setupFillScreen(): void {
    if (this._resizeHandler) return;
    this._resizeHandler = () => this._updateFillScreenHeight();
    window.addEventListener("resize", this._resizeHandler);
  }

  private _teardownFillScreen(): void {
    if (this._resizeHandler) {
      window.removeEventListener("resize", this._resizeHandler);
      this._resizeHandler = null;
    }
    this.style.removeProperty("--shopping-list-host-height");
  }

  /* --- Offline support --- */

  private _setupConnectionMonitoring(): void {
    this._teardownConnectionMonitoring();
    const conn = this.hass?.connection as Record<string, unknown> | undefined;
    if (!conn) return;

    const isConnected = "connected" in conn ? !!(conn.connected as boolean) : true;
    this._connected = isConnected;

    const onReady = (): void => {
      this._connected = true;
      void this._flushOfflineQueue();
    };
    const onDisconnected = (): void => {
      this._connected = false;
    };

    if (typeof conn.addEventListener === "function") {
      (conn as unknown as EventTarget).addEventListener("ready", onReady);
      (conn as unknown as EventTarget).addEventListener("disconnected", onDisconnected);
      this._connectionUnsubs.push(() => {
        (conn as unknown as EventTarget).removeEventListener("ready", onReady);
        (conn as unknown as EventTarget).removeEventListener("disconnected", onDisconnected);
      });
    }

    window.addEventListener("online", onReady);
    window.addEventListener("offline", onDisconnected);
    this._connectionUnsubs.push(() => {
      window.removeEventListener("online", onReady);
      window.removeEventListener("offline", onDisconnected);
    });
  }

  private _teardownConnectionMonitoring(): void {
    for (const unsub of this._connectionUnsubs) {
      try {
        unsub();
      } catch {
        /* ignore */
      }
    }
    this._connectionUnsubs = [];
  }

  private async _executeService(
    domain: string,
    service: string,
    serviceData: Record<string, unknown>,
  ): Promise<void> {
    if (!this.hass) return;

    if (!this._connected) {
      this._offlineQueue = [...this._offlineQueue, { domain, service, serviceData }];
      return;
    }

    try {
      await this.hass.callService(domain, service, serviceData);
    } catch (err) {
      if (this._isConnectionError(err)) {
        this._connected = false;
        this._offlineQueue = [...this._offlineQueue, { domain, service, serviceData }];
      } else {
        this._error = err instanceof Error ? err.message : String(err);
        throw err;
      }
    }
  }

  private _isConnectionError(err: unknown): boolean {
    if (err instanceof Error) {
      const msg = err.message.toLowerCase();
      return (
        msg.includes("connection") ||
        msg.includes("network") ||
        msg.includes("fetch") ||
        msg.includes("websocket") ||
        msg.includes("closed") ||
        msg.includes("offline")
      );
    }
    return false;
  }

  private async _flushOfflineQueue(): Promise<void> {
    if (!this.hass || this._offlineQueue.length === 0) return;

    const queue = [...this._offlineQueue];
    this._offlineQueue = [];

    for (const op of queue) {
      try {
        await this.hass.callService(op.domain, op.service, op.serviceData);
      } catch (err) {
        if (this._isConnectionError(err)) {
          this._offlineQueue = [op, ...this._offlineQueue];
          this._connected = false;
          return;
        }
      }
    }

    const entity = this._config?.entity;
    if (entity) {
      try {
        const result = await this.hass.callWS<{ items: TodoItem[] }>({
          type: "todo/item/list",
          entity_id: entity,
        });
        this._items = result.items ?? [];
      } catch {
        /* ignore */
      }
    }
  }

  /* --- Reorder (drag and drop) --- */

  private _getOrderKey(): string {
    return `shopping_list_order_${this._config?.entity ?? "default"}`;
  }

  private _loadItemOrder(): void {
    try {
      const stored = localStorage.getItem(this._getOrderKey());
      if (stored) {
        this._itemOrder = JSON.parse(stored);
      } else {
        this._itemOrder = [];
      }
    } catch {
      this._itemOrder = [];
    }
  }

  private _saveItemOrder(): void {
    try {
      if (this._itemOrder.length > 0) {
        localStorage.setItem(this._getOrderKey(), JSON.stringify(this._itemOrder));
      } else {
        localStorage.removeItem(this._getOrderKey());
      }
    } catch {
      /* ignore quota */
    }
  }

  private _getOrderedItems(items: TodoItem[]): TodoItem[] {
    const cfg = this._config;
    const sortMode = cfg?.sort;
    const enableReorder = cfg?.enable_reorder !== false;

    if (sortMode === "manual" && enableReorder && this._itemOrder.length > 0) {
      const uidSet = new Set(items.map((i) => i.uid));
      const validOrder = this._itemOrder.filter((uid) => uidSet.has(uid));
      const extra = items.filter((i) => !validOrder.includes(i.uid));
      const ordered = validOrder
        .map((uid) => items.find((i) => i.uid === uid))
        .filter(Boolean) as TodoItem[];
      return [...ordered, ...extra];
    }

    if (sortMode === "alpha") {
      return [...items].sort((a, b) => a.summary.localeCompare(b.summary));
    }

    return items;
  }

  private _onDragStart(ev: DragEvent): void {
    const li = (ev.target as HTMLElement).closest(".sl-item") as HTMLElement | null;
    if (!li) return;
    const uid = li.dataset.uid;
    if (!uid) return;
    this._draggedUid = uid;
    ev.dataTransfer?.setData("text/plain", uid);
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
    }
    li.classList.add("sl-item--dragging");
  }

  private _onDragOver(ev: DragEvent): void {
    ev.preventDefault();
    if (!ev.dataTransfer) return;
    ev.dataTransfer.dropEffect = "move";

    this.renderRoot
      .querySelectorAll(".sl-item--drop-above, .sl-item--drop-below")
      .forEach((el) => el.classList.remove("sl-item--drop-above", "sl-item--drop-below"));

    const items = this.renderRoot.querySelectorAll<HTMLElement>(".sl-item");
    if (items.length === 0) return;

    const cy = ev.clientY;

    for (const item of items) {
      if (item.dataset.uid === this._draggedUid) continue;
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (cy <= mid) {
        this._dropPosition = "above";
        item.classList.add("sl-item--drop-above");
        return;
      }
    }

    const last = items[items.length - 1];
    this._dropPosition = "below";
    last.classList.add("sl-item--drop-below");
  }

  private _onDropWrapper(ev: DragEvent): void {
    ev.preventDefault();

    const indicator = this.renderRoot.querySelector<HTMLElement>(
      ".sl-item--drop-above, .sl-item--drop-below",
    );

    this.renderRoot
      .querySelectorAll(".sl-item--drop-above, .sl-item--drop-below, .sl-item--dragging")
      .forEach((el) =>
        el.classList.remove("sl-item--drop-above", "sl-item--drop-below", "sl-item--dragging"),
      );

    const targetUid = indicator?.dataset.uid;
    if (!targetUid || !this._draggedUid || this._draggedUid === targetUid) {
      this._draggedUid = null;
      this._dropPosition = "above";
      return;
    }

    const items = this._getOrderedItems(this._items);
    const fromIdx = items.findIndex((i) => i.uid === this._draggedUid);
    const toIdx = items.findIndex((i) => i.uid === targetUid);
    if (fromIdx === -1 || toIdx === -1) {
      this._draggedUid = null;
      this._dropPosition = "above";
      return;
    }

    const [moved] = items.splice(fromIdx, 1);
    const adjustedTo = items.findIndex((i) => i.uid === targetUid);
    const insertAt =
      adjustedTo >= 0
        ? this._dropPosition === "below"
          ? adjustedTo + 1
          : adjustedTo
        : toIdx > fromIdx
          ? toIdx - 1
          : toIdx;
    items.splice(insertAt, 0, moved);

    const activeUids = new Set(
      this._items.filter((i) => i.status !== "completed").map((i) => i.uid),
    );
    this._itemOrder = items
      .filter((i) => activeUids.has(i.uid) || i.status === "needs_action")
      .map((i) => i.uid);
    this._saveItemOrder();
    this._draggedUid = null;
    this._dropPosition = "above";
    this.requestUpdate();
  }

  private _onDragEnd(): void {
    this.renderRoot
      .querySelectorAll(".sl-item--drop-above, .sl-item--drop-below, .sl-item--dragging")
      .forEach((el) =>
        el.classList.remove("sl-item--drop-above", "sl-item--drop-below", "sl-item--dragging"),
      );
    this._draggedUid = null;
    this._dropPosition = "above";
  }

  /* --- Touch drag-and-drop (mobile) --- */

  private _onTouchStart(ev: TouchEvent): void {
    const handle = (ev.target as HTMLElement).closest(".sl-drag-handle") as HTMLElement | null;
    if (!handle) return;
    const li = handle.closest(".sl-item") as HTMLElement | null;
    if (!li) return;
    const uid = li.dataset.uid;
    if (!uid) return;
    this._touchDragUid = uid;
    li.classList.add("sl-item--dragging");
  }

  private _onTouchMove(ev: TouchEvent): void {
    if (!this._touchDragUid) return;
    ev.preventDefault();

    const touch = ev.touches[0];
    if (!touch) return;

    const el = (this.renderRoot as ShadowRoot).elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;

    const li = (el as HTMLElement).closest(".sl-item") as HTMLElement | null;

    this.renderRoot
      .querySelectorAll(".sl-item--drop-above, .sl-item--drop-below")
      .forEach((el) => el.classList.remove("sl-item--drop-above", "sl-item--drop-below"));

    if (li && li.dataset.uid !== this._touchDragUid) {
      const rect = li.getBoundingClientRect();
      this._dropPosition = touch.clientY < rect.top + rect.height / 2 ? "above" : "below";
      li.classList.add(
        this._dropPosition === "above" ? "sl-item--drop-above" : "sl-item--drop-below",
      );
    }
  }

  private _onTouchEnd(_ev: TouchEvent): void {
    if (!this._touchDragUid) return;

    const indicator = this.renderRoot.querySelector<HTMLElement>(
      ".sl-item--drop-above, .sl-item--drop-below",
    );

    this.renderRoot
      .querySelectorAll(".sl-item--drop-above, .sl-item--drop-below, .sl-item--dragging")
      .forEach((el) =>
        el.classList.remove("sl-item--drop-above", "sl-item--drop-below", "sl-item--dragging"),
      );

    const targetUid = indicator?.dataset.uid;
    if (targetUid && this._touchDragUid !== targetUid) {
      const items = this._getOrderedItems(this._items);
      const fromIdx = items.findIndex((i) => i.uid === this._touchDragUid);
      const toIdx = items.findIndex((i) => i.uid === targetUid);
      if (fromIdx !== -1 && toIdx !== -1) {
        const [moved] = items.splice(fromIdx, 1);
        const adjustedTo = items.findIndex((i) => i.uid === targetUid);
        const insertAt =
          adjustedTo >= 0
            ? this._dropPosition === "below"
              ? adjustedTo + 1
              : adjustedTo
            : toIdx > fromIdx
              ? toIdx - 1
              : toIdx;
        items.splice(insertAt, 0, moved);

        const activeUids = new Set(
          this._items.filter((i) => i.status !== "completed").map((i) => i.uid),
        );
        this._itemOrder = items
          .filter((i) => activeUids.has(i.uid) || i.status === "needs_action")
          .map((i) => i.uid);
        this._saveItemOrder();
        this.requestUpdate();
      }
    }

    this._touchDragUid = null;
    this._dropPosition = "above";
  }

  /* --- HA Todo API plumbing --- */

  private async _setupSubscription(entity: string): Promise<void> {
    this._teardownSubscription();
    if (!this.hass) return;
    this._loading = true;
    this._error = undefined;
    try {
      const result = await this.hass.callWS<{ items: TodoItem[] }>({
        type: "todo/item/list",
        entity_id: entity,
      });
      this._items = result.items ?? [];

      this._unsub = await this.hass.connection.subscribeMessage<{ items: TodoItem[] }>(
        (msg) => {
          this._items = msg.items ?? [];
        },
        { type: "todo/item/subscribe", entity_id: entity },
      );
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      this._loading = false;
    }
  }

  private _teardownSubscription(): void {
    if (this._unsub) {
      try {
        this._unsub();
      } catch {
        /* ignore */
      }
      this._unsub = undefined;
    }
  }

  private async _addItem(): Promise<void> {
    const cfg = this._config;
    const entity = cfg?.entity;
    const trimmed = this._draft.trim();
    if (!entity || !trimmed || !this.hass) return;

    const enableQuantity = cfg.enable_quantity ?? false;
    const quantity = clampQuantity(this._addQuantity, cfg.quantity_max ?? 0);
    const itemSummary = enableQuantity ? formatQuantity(trimmed, quantity) : trimmed;

    const tempUid = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const tempItem: TodoItem = {
      uid: tempUid,
      summary: itemSummary,
      status: "needs_action",
    };

    if (!this._connected) {
      this._items = [...this._items, tempItem];
    }

    try {
      await this._executeService("todo", "add_item", { entity_id: entity, item: itemSummary });
      this._draft = "";
      this._addQuantity = 1;
    } catch {
      this._items = this._items.filter((i) => i.uid !== tempUid);
    }
  }

  private _adjustAddQuantity(delta: number): void {
    const max = this._config?.quantity_max ?? 0;
    this._addQuantity = clampQuantity(this._addQuantity + delta, max);
  }

  private async _toggleItem(item: TodoItem): Promise<void> {
    const entity = this._config?.entity;
    if (!entity || !this.hass) return;
    const next = item.status === "completed" ? "needs_action" : "completed";

    if (!this._connected) {
      this._items = this._items.map((i) => (i.uid === item.uid ? { ...i, status: next } : i));
    }

    try {
      await this._executeService("todo", "update_item", {
        entity_id: entity,
        item: item.uid,
        status: next,
      });
    } catch {
      this._items = this._items.map((i) =>
        i.uid === item.uid ? { ...i, status: item.status } : i,
      );
    }
  }

  private async _removeItem(item: TodoItem): Promise<void> {
    const entity = this._config?.entity;
    if (!entity || !this.hass) return;

    if (!this._connected) {
      this._items = this._items.filter((i) => i.uid !== item.uid);
    }

    try {
      await this._executeService("todo", "remove_item", {
        entity_id: entity,
        item: item.uid,
      });
    } catch {
      if (!this._connected) {
        this._items = [...this._items, item];
      }
    }
  }

  private async _toggleCategoryAll(items: TodoItem[], allCompleted: boolean): Promise<void> {
    const entity = this._config?.entity;
    if (!entity || !this.hass || items.length === 0) return;
    const target = allCompleted ? "needs_action" : "completed";

    if (!this._connected) {
      const targetUids = new Set(items.filter((i) => i.status !== target).map((i) => i.uid));
      this._items = this._items.map((i) => (targetUids.has(i.uid) ? { ...i, status: target } : i));
    }

    const toUpdate = items.filter((i) => i.status !== target);
    for (const item of toUpdate) {
      try {
        await this._executeService("todo", "update_item", {
          entity_id: entity,
          item: item.uid,
          status: target,
        });
      } catch (err) {
        this._error = err instanceof Error ? err.message : String(err);
        return;
      }
    }
  }

  private _toggleCategoryCollapse(key: string): void {
    const next = new Set(this._collapsedCategories);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._collapsedCategories = next;
  }

  private _categoryColor(name: string): string | undefined {
    const cfg = this._config!;
    const map = cfg.category_colors !== undefined ? cfg.category_colors : DEFAULT_CATEGORY_COLORS;
    return map[name];
  }

  /* --- Inline edit --- */

  private _startEdit(item: TodoItem): void {
    const enableQuantity = this._config?.enable_quantity ?? false;
    if (enableQuantity) {
      const { name, quantity } = parseQuantity(item.summary);
      this._editDraft = name;
      this._editQuantity = quantity;
    } else {
      this._editDraft = item.summary;
      this._editQuantity = 1;
    }
    this._editingUid = item.uid;
    this._focusEditOnUpdate = true;
  }

  private _cancelEdit(): void {
    this._editingUid = undefined;
    this._editDraft = "";
    this._editQuantity = 1;
  }

  private async _saveEdit(item: TodoItem): Promise<void> {
    if (this._editingUid !== item.uid) return;

    const cfg = this._config;
    if (!cfg) {
      this._cancelEdit();
      return;
    }

    const trimmedName = this._editDraft.trim();
    if (!trimmedName) {
      this._cancelEdit();
      return;
    }

    const enableQuantity = cfg.enable_quantity ?? false;
    const newSummary = enableQuantity
      ? formatQuantity(trimmedName, clampQuantity(this._editQuantity, cfg.quantity_max ?? 0))
      : trimmedName;

    if (newSummary === item.summary) {
      this._cancelEdit();
      return;
    }

    const entity = cfg.entity;
    if (!entity || !this.hass) {
      this._cancelEdit();
      return;
    }

    this._cancelEdit();

    if (!this._connected) {
      this._items = this._items.map((i) =>
        i.uid === item.uid ? { ...i, summary: newSummary } : i,
      );
    }

    try {
      await this._executeService("todo", "update_item", {
        entity_id: entity,
        item: item.uid,
        rename: newSummary,
      });
    } catch {
      this._items = this._items.map((i) =>
        i.uid === item.uid ? { ...i, summary: item.summary } : i,
      );
    }
  }

  private _adjustEditQuantity(delta: number): void {
    const max = this._config?.quantity_max ?? 0;
    this._editQuantity = clampQuantity(this._editQuantity + delta, max);
  }

  /* --- Sorting / filtering --- */

  private _sort(items: TodoItem[]): TodoItem[] {
    return this._getOrderedItems(items);
  }

  private _splitItems(): { active: TodoItem[]; completed: TodoItem[] } {
    const active: TodoItem[] = [];
    const completed: TodoItem[] = [];
    for (const item of this._items) {
      if (item.status === "completed") completed.push(item);
      else active.push(item);
    }
    return { active: this._sort(active), completed: this._sort(completed) };
  }

  private _buildGroups(): CategoryGroup[] {
    const cfg = this._config!;
    const generalLabel = cfg.general_category_label || "General";
    const groups = new Map<string, CategoryGroup>();
    const insertionOrder: string[] = [];

    for (const item of this._items) {
      const { category } = parseCategory(item.summary);
      const key = category ?? GENERAL_GROUP_KEY;
      let g = groups.get(key);
      if (!g) {
        g = {
          key,
          category,
          displayName: category ?? generalLabel,
          active: [],
          completed: [],
        };
        groups.set(key, g);
        insertionOrder.push(key);
      }
      if (item.status === "completed") g.completed.push(item);
      else g.active.push(item);
    }

    const sorted: CategoryGroup[] = insertionOrder.map((k) => {
      const g = groups.get(k)!;
      return {
        ...g,
        active: this._sort(g.active),
        completed: this._sort(g.completed),
      };
    });

    if (cfg.sort === "alpha") {
      sorted.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }

    return sorted;
  }

  /* --- Render --- */

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;
    const customStyle = this._extractCustomStyle();
    const showAdd = !!(cfg.show_add_input && cfg.entity);
    const fillScreen = cfg.fill_screen ?? false;
    // In fill_screen mode the add bar always floats at the bottom,
    // regardless of the configured position.
    const position = cfg.add_input_position ?? "bottom";

    return html`
      <ha-card class="sl-card ${fillScreen ? "sl-card--fill-screen" : ""}">
        ${cfg.show_header ? this._renderHeader() : nothing}
        ${this._error ? html`<div class="sl-error">${this._error}</div>` : nothing}
        ${this._offlineQueue.length > 0 ? this._renderOfflineBanner() : nothing}
        ${showAdd && position === "top" ? this._renderAddRow("top") : nothing}
        ${this._renderScrollWrapper()}
        ${showAdd && position !== "top" ? this._renderAddRow("bottom") : nothing}
      </ha-card>
      ${
        customStyle
          ? html`<style>
              ${customStyle}
            </style>`
          : nothing
      }
    `;
  }

  private _renderOfflineBanner(): TemplateResult {
    const count = this._offlineQueue.length;
    return html`
      <div class="sl-offline">
        <ha-icon icon="mdi:cloud-off-outline"></ha-icon>
        <span>Offline — ${count} pending change${count !== 1 ? "s" : ""}</span>
      </div>
    `;
  }

  private _renderScrollWrapper(): TemplateResult {
    const cfg = this._config!;
    const enableReorder = cfg.enable_reorder !== false && (cfg.sort === "manual" || !cfg.sort);
    return html`
      <div
        class="sl-list-scroll"
        @dragover=${enableReorder ? this._onDragOver : null}
        @drop=${enableReorder ? this._onDropWrapper : null}
      >
        ${this._renderBody()}
      </div>
    `;
  }

  private _renderBody(): TemplateResult {
    const cfg = this._config!;

    if (!cfg.entity) {
      return html`<div class="sl-empty">
        No todo entity selected. Open the editor to pick one.
      </div>`;
    }

    if (this._loading && this._items.length === 0) {
      return html`<div class="sl-empty">Loading…</div>`;
    }

    if (cfg.enable_categories && cfg.group_by_category !== false) {
      return this._renderGrouped();
    }
    return this._renderFlat();
  }

  private _renderFlat(): TemplateResult {
    const cfg = this._config!;
    const mode = cfg.completed ?? "bottom";
    const { active, completed } = this._splitItems();

    let mainItems: TodoItem[];
    let trailingCompleted: TodoItem[] = [];
    let showCollapseToggle = false;

    if (mode === "hide") {
      mainItems = active;
    } else if (mode === "inline") {
      mainItems = this._sort([...this._items]);
    } else if (mode === "bottom") {
      mainItems = active;
      trailingCompleted = completed;
    } else {
      mainItems = active;
      showCollapseToggle = completed.length > 0;
      if (this._completedExpanded) trailingCompleted = completed;
    }

    if (mainItems.length === 0 && trailingCompleted.length === 0 && !showCollapseToggle) {
      return html`<div class="sl-empty">${cfg.empty_message}</div>`;
    }

    return html`
      <ul class="sl-list">
        ${repeat(
          mainItems,
          (i) => i.uid,
          (i) => this._renderItem(i),
        )}
        ${showCollapseToggle ? this._renderCompletedToggle(completed.length) : nothing}
        ${repeat(
          trailingCompleted,
          (i) => i.uid,
          (i) => this._renderItem(i),
        )}
      </ul>
    `;
  }

  private _renderGrouped(): TemplateResult {
    const cfg = this._config!;
    const mode = cfg.completed ?? "bottom";
    const groups = this._buildGroups();

    let globalCompleted: TodoItem[] = [];
    let showGlobalCollapseToggle = false;
    if (mode === "collapse") {
      const allCompleted: TodoItem[] = [];
      for (const g of groups) allCompleted.push(...g.completed);
      globalCompleted = this._sort(allCompleted);
      showGlobalCollapseToggle = globalCompleted.length > 0;
    }

    const visible = groups.filter((g) => {
      if (mode === "hide" || mode === "collapse") return g.active.length > 0;
      return g.active.length + g.completed.length > 0;
    });

    if (visible.length === 0 && !showGlobalCollapseToggle) {
      return html`<div class="sl-empty">${cfg.empty_message}</div>`;
    }

    return html`
      <div class="sl-list sl-list--grouped">
        ${repeat(
          visible,
          (g) => g.key,
          (g) => this._renderGroup(g),
        )}
        ${
          showGlobalCollapseToggle
            ? html`
                <ul class="sl-list sl-grouped-completed">
                  ${this._renderCompletedToggle(globalCompleted.length)}
                  ${
                    this._completedExpanded
                      ? repeat(
                          globalCompleted,
                          (i) => i.uid,
                          (i) => this._renderItem(i, { hidePrefix: false }),
                        )
                      : nothing
                  }
                </ul>
              `
            : nothing
        }
      </div>
    `;
  }

  private _renderGroup(group: CategoryGroup): TemplateResult {
    const cfg = this._config!;
    const mode = cfg.completed ?? "bottom";

    const headerScope = mode === "collapse" ? group.active : [...group.active, ...group.completed];
    const allCompleted =
      headerScope.length > 0 && headerScope.every((i) => i.status === "completed");
    const someCompleted = !allCompleted && headerScope.some((i) => i.status === "completed");

    const showCheckAll = cfg.category_check_all !== false;
    const showCollapseToggle = cfg.category_collapsible !== false;

    const isCollapsed = showCollapseToggle && this._collapsedCategories.has(group.key);

    let groupItems: TodoItem[];
    if (mode === "hide" || mode === "collapse") {
      groupItems = group.active;
    } else if (mode === "inline") {
      groupItems = this._sort([...group.active, ...group.completed]);
    } else {
      groupItems = [...group.active, ...group.completed];
    }

    const colorValue = this._categoryColor(group.displayName);
    const styleAttr = colorValue ? `--shopping-list-category-color: ${colorValue}` : "";

    return html`
      <section class="sl-category" style=${styleAttr}>
        <div class="sl-category-header">
          ${
            showCheckAll
              ? html`<ha-checkbox
                  class="sl-category-checkbox"
                  .checked=${allCompleted}
                  .indeterminate=${someCompleted}
                  @click=${(ev: Event) => ev.stopPropagation()}
                  @change=${() => this._toggleCategoryAll(headerScope, allCompleted)}
                ></ha-checkbox>`
              : nothing
          }
          <button
            class="sl-category-name"
            type="button"
            ?disabled=${!showCollapseToggle}
            aria-expanded=${showCollapseToggle ? (isCollapsed ? "false" : "true") : "true"}
            @click=${showCollapseToggle ? () => this._toggleCategoryCollapse(group.key) : null}
          >
            [${group.displayName}]${
              cfg.category_show_count !== false && group.active.length > 0
                ? html`<span class="sl-category-count" aria-label="active items"
                    >(${group.active.length})</span
                  >`
                : nothing
            }
          </button>
          ${
            showCollapseToggle
              ? html`<button
                  type="button"
                  class="sl-category-collapse"
                  aria-label=${isCollapsed ? "Expand category" : "Collapse category"}
                  @click=${() => this._toggleCategoryCollapse(group.key)}
                >
                  <ha-icon .icon=${isCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}></ha-icon>
                </button>`
              : nothing
          }
        </div>
        ${
          !isCollapsed
            ? html`<ul class="sl-category-items">
                ${repeat(
                  groupItems,
                  (i) => i.uid,
                  (i) => this._renderItem(i, { hidePrefix: true }),
                )}
              </ul>`
            : nothing
        }
      </section>
    `;
  }

  private _renderCompletedToggle(count: number): TemplateResult {
    const expanded = this._completedExpanded;
    const label = this._config?.completed_label || "Completed";
    return html`
      <li
        class="sl-completed-toggle ${expanded ? "sl-completed-toggle--expanded" : ""}"
        role="button"
        tabindex="0"
        aria-expanded=${expanded ? "true" : "false"}
        @click=${this._toggleCompletedExpanded}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this._toggleCompletedExpanded();
          }
        }}
      >
        <ha-icon
          class="sl-completed-toggle-icon"
          .icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
        ></ha-icon>
        <span class="sl-completed-toggle-label">${label} (${count})</span>
      </li>
    `;
  }

  private _toggleCompletedExpanded = (): void => {
    this._completedExpanded = !this._completedExpanded;
  };

  private _renderHeader(): TemplateResult {
    const cfg = this._config!;
    return html`
      <div class="sl-header">
        ${cfg.icon ? html`<ha-icon class="sl-icon" .icon=${cfg.icon}></ha-icon>` : nothing}
        <span class="sl-title">${cfg.title}</span>
      </div>
    `;
  }

  private _renderItem(item: TodoItem, opts?: { hidePrefix?: boolean }): TemplateResult {
    const cfg = this._config!;
    const completed = item.status === "completed";
    const isEditing = this._editingUid === item.uid;
    const enableEdit = cfg.enable_edit !== false;
    const enableRemove = cfg.enable_remove !== false;
    const enableQuantity = cfg.enable_quantity ?? false;
    const quantityMax = cfg.quantity_max ?? 0;
    const clickToCheck = cfg.click_to_check !== false;
    const enableCategories = cfg.enable_categories ?? false;
    const enableReorder =
      cfg.enable_reorder !== false && (cfg.sort === "manual" || !cfg.sort) && !isEditing;

    let nameSource = item.summary;
    let displayCategory: string | null = null;
    if (enableCategories) {
      const parsedCat = parseCategory(item.summary);
      displayCategory = parsedCat.category;
      nameSource = parsedCat.rest;
    }
    const parsed = enableQuantity ? parseQuantity(nameSource) : { name: nameSource, quantity: 1 };
    const showQuantityBadge = enableQuantity && parsed.quantity > 1;

    const showCategoryPrefix = enableCategories && !opts?.hidePrefix && !!displayCategory;
    const colorValue = displayCategory ? this._categoryColor(displayCategory) : undefined;
    const itemStyle = colorValue ? `--shopping-list-category-color: ${colorValue}` : "";

    const canDecrement = this._editQuantity > 1;
    const canIncrement = quantityMax <= 0 || this._editQuantity < quantityMax;

    const suppressBlur = (ev: MouseEvent) => ev.preventDefault();

    return html`
      <li
        class="sl-item ${completed ? "sl-item--completed" : ""} ${
          isEditing ? "sl-item--editing" : ""
        } ${!clickToCheck ? "sl-item--no-row-click" : ""} ${
          this._draggedUid === item.uid ? "sl-item--dragging" : ""
        }"
        style=${itemStyle}
        data-uid=${item.uid}
        @click=${(ev: MouseEvent) => {
          if (!clickToCheck) return;
          if (isEditing) return;
          if ((ev.target as HTMLElement).tagName === "HA-CHECKBOX") return;
          void this._toggleItem(item);
        }}
      >
        ${
          enableReorder
            ? html`<ha-icon
                class="sl-drag-handle"
                draggable="true"
                icon="mdi:drag"
                @mousedown=${(ev: MouseEvent) => ev.stopPropagation()}
                @dragstart=${this._onDragStart}
                @dragend=${this._onDragEnd}
                @touchstart=${this._onTouchStart}
                @touchmove=${this._onTouchMove}
                @touchend=${this._onTouchEnd}
              ></ha-icon>`
            : nothing
        }

        <ha-checkbox
          class="sl-checkbox"
          .checked=${completed}
          ?disabled=${isEditing}
          @change=${() => this._toggleItem(item)}
        ></ha-checkbox>

        ${
          isEditing
            ? html`<input
                class="sl-edit-input"
                type="text"
                .value=${this._editDraft}
                aria-label="Edit item"
                @click=${(ev: Event) => ev.stopPropagation()}
                @input=${(ev: Event) => {
                  this._editDraft = (ev.target as HTMLInputElement).value;
                }}
                @keydown=${(ev: KeyboardEvent) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    void this._saveEdit(item);
                  } else if (ev.key === "Escape") {
                    ev.preventDefault();
                    this._cancelEdit();
                  }
                }}
                @blur=${() => {
                  if (this._editingUid === item.uid) {
                    void this._saveEdit(item);
                  }
                }}
              />`
            : html`<span class="sl-summary">
                ${
                  showCategoryPrefix
                    ? html`<span class="sl-category-prefix">[${displayCategory}]</span> `
                    : nothing
                }<span class="sl-name">${parsed.name}</span>${
                  showQuantityBadge
                    ? html`<span class="sl-quantity-badge">×${parsed.quantity}</span>`
                    : nothing
                }
              </span>`
        }
        ${
          isEditing && enableQuantity
            ? html`
                <div class="sl-quantity-stepper" aria-label="Item quantity">
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--minus"
                    ?disabled=${!canDecrement}
                    aria-label="Decrease quantity"
                    @mousedown=${suppressBlur}
                    @click=${(ev: MouseEvent) => {
                      ev.stopPropagation();
                      this._adjustEditQuantity(-1);
                    }}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span class="sl-quantity-value" aria-live="polite">${this._editQuantity}</span>
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--plus"
                    ?disabled=${!canIncrement}
                    aria-label="Increase quantity"
                    @mousedown=${suppressBlur}
                    @click=${(ev: MouseEvent) => {
                      ev.stopPropagation();
                      this._adjustEditQuantity(1);
                    }}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              `
            : nothing
        }

        <div class="sl-actions">
          ${
            isEditing
              ? html`
                  <ha-icon-button
                    class="sl-action-button sl-action-button-save"
                    .label=${"Save"}
                    @mousedown=${suppressBlur}
                    @click=${(ev: MouseEvent) => {
                      ev.stopPropagation();
                      void this._saveEdit(item);
                    }}
                  >
                    <ha-icon icon="mdi:check"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    class="sl-action-button sl-action-button-cancel"
                    .label=${"Cancel"}
                    @mousedown=${suppressBlur}
                    @click=${(ev: MouseEvent) => {
                      ev.stopPropagation();
                      this._cancelEdit();
                    }}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </ha-icon-button>
                `
              : html`
                  ${
                    enableEdit
                      ? html`<ha-icon-button
                          class="sl-action-button sl-action-button-edit"
                          .label=${"Edit"}
                          @click=${(ev: MouseEvent) => {
                            ev.stopPropagation();
                            this._startEdit(item);
                          }}
                        >
                          <ha-icon icon="mdi:pencil"></ha-icon>
                        </ha-icon-button>`
                      : nothing
                  }
                  ${
                    enableRemove
                      ? html`<ha-icon-button
                          class="sl-action-button sl-action-button-delete"
                          .label=${"Remove"}
                          @click=${(ev: MouseEvent) => {
                            ev.stopPropagation();
                            void this._removeItem(item);
                          }}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </ha-icon-button>`
                      : nothing
                  }
                `
          }
        </div>
      </li>
    `;
  }

  private _renderAddRow(position: "top" | "bottom"): TemplateResult {
    const cfg = this._config!;
    const canAdd = this._draft.trim().length > 0;
    const enableQuantity = cfg.enable_quantity ?? false;
    const quantityMax = cfg.quantity_max ?? 0;
    const canAddDecrement = this._addQuantity > 1;
    const canAddIncrement = quantityMax <= 0 || this._addQuantity < quantityMax;

    const suppressBlur = (ev: MouseEvent) => ev.preventDefault();

    return html`
      <div class="sl-add-row sl-add-row--${position}">
        <input
          class="sl-input"
          type="text"
          placeholder="Add an item…"
          .value=${this._draft}
          @input=${(ev: Event) => {
            this._draft = (ev.target as HTMLInputElement).value;
          }}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              void this._addItem();
            }
          }}
        />
        ${
          enableQuantity
            ? html`
                <div
                  class="sl-quantity-stepper sl-quantity-stepper--add"
                  aria-label="Initial quantity for new item"
                >
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--minus"
                    ?disabled=${!canAddDecrement}
                    aria-label="Decrease quantity"
                    @mousedown=${suppressBlur}
                    @click=${() => this._adjustAddQuantity(-1)}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span class="sl-quantity-value" aria-live="polite">${this._addQuantity}</span>
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--plus"
                    ?disabled=${!canAddIncrement}
                    aria-label="Increase quantity"
                    @mousedown=${suppressBlur}
                    @click=${() => this._adjustAddQuantity(1)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              `
            : nothing
        }
        <button
          class="sl-add-button"
          type="button"
          ?disabled=${!canAdd}
          @click=${() => this._addItem()}
        >
          ${cfg.add_button_label}
        </button>
      </div>
    `;
  }

  private _extractCustomStyle(): string | undefined {
    const cfg = this._config;
    if (!cfg) return undefined;
    if (typeof cfg.style === "string" && cfg.style.trim()) return cfg.style;
    if (cfg.card_mod) {
      if (typeof cfg.card_mod === "string") return cfg.card_mod;
      if (typeof cfg.card_mod === "object" && cfg.card_mod.style) return cfg.card_mod.style;
    }
    return undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: ShoppingListCard;
  }
}

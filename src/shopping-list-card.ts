import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "./ha-types.js";

import { CARD_TAG, CARD_VERSION, DEFAULT_CONFIG, EDITOR_TAG } from "./const.js";
import { DEFAULT_CATEGORY_COLORS, parseCategory } from "./categories.js";
import { clampQuantity, formatQuantity, parseQuantity } from "./quantity.js";
import type { ShoppingListCardConfig, TodoItem } from "./types.js";
import { cardStyles } from "./styles.js";

/**
 * One category bucket. `key` distinguishes the special "general" bucket
 * from a real category named "__general__" (as unlikely as that is) so
 * that our state Set and Map operations are unambiguous.
 */
interface CategoryGroup {
  key: string;
  category: string | null;
  displayName: string;
  active: TodoItem[];
  completed: TodoItem[];
}

const GENERAL_GROUP_KEY = "__general__";

// Editor side-effect import so HA can lazy-load it.
import "./shopping-list-card-editor.js";

/* ───────────────────────────────────────────────────────────────────────────
 * Register card with the HA frontend.
 * ─────────────────────────────────────────────────────────────────────────── */
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
    description: "A shopping-style list view for any todo entity, with categories and quantities.",
    preview: true,
    documentationURL: "https://github.com/MCuello17/ha-shopping-list",
  });
}

console.info(
  `%c SHOPPING-LIST-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;",
);

/* ─────────────────────────────────────────────────────────────────────────── */

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

  private _unsub?: () => void;
  private _lastEntity?: string;
  /** Set true on edit start; consumed by `updated()` to focus the input once. */
  private _focusEditOnUpdate = false;

  static styles = cardStyles;

  /* ─── Card public API ──────────────────────────────────────────────── */

  public static getStubConfig(): ShoppingListCardConfig {
    return { ...DEFAULT_CONFIG };
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TAG) as unknown as LovelaceCardEditor;
  }

  public setConfig(config: ShoppingListCardConfig): void {
    if (!config) throw new Error("Invalid configuration");

    // Migrate legacy `show_completed: boolean` → new `completed` enum.
    // We only fill `completed` when it isn't already set, so explicit new
    // configs always win over the deprecated flag.
    const migrated: ShoppingListCardConfig = { ...config };
    if (migrated.completed === undefined && migrated.show_completed !== undefined) {
      migrated.completed = migrated.show_completed ? "inline" : "hide";
    }

    this._config = { ...DEFAULT_CONFIG, ...migrated };
  }

  public getCardSize(): number {
    const base = this._config?.show_header ? 2 : 1;
    return base + Math.min(this._items.length, 6);
  }

  /* ─── Lifecycle ────────────────────────────────────────────────────── */

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownSubscription();
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

    const entity = this._config?.entity;
    if (!entity || !this.hass) return;
    if (entity !== this._lastEntity) {
      this._lastEntity = entity;
      void this._setupSubscription(entity);
    }
  }

  /* ─── HA Todo API plumbing ─────────────────────────────────────────── */

  private async _setupSubscription(entity: string): Promise<void> {
    this._teardownSubscription();
    if (!this.hass) return;
    this._loading = true;
    this._error = undefined;
    try {
      // Initial fetch.
      const result = await this.hass.callWS<{ items: TodoItem[] }>({
        type: "todo/item/list",
        entity_id: entity,
      });
      this._items = result.items ?? [];

      // Subscribe to updates.
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
    // formatQuantity drops the marker entirely when quantity == 1, so
    // single-quantity adds still produce clean summaries.
    const itemSummary = enableQuantity ? formatQuantity(trimmed, quantity) : trimmed;

    try {
      await this.hass.callService("todo", "add_item", { entity_id: entity, item: itemSummary });
      this._draft = "";
      // Per spec: quantities start at 1. Reset after every successful
      // add so the next item begins fresh rather than carrying over.
      this._addQuantity = 1;
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
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
    try {
      await this.hass.callService("todo", "update_item", {
        entity_id: entity,
        item: item.uid,
        status: next,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _removeItem(item: TodoItem): Promise<void> {
    const entity = this._config?.entity;
    if (!entity || !this.hass) return;
    try {
      await this.hass.callService("todo", "remove_item", {
        entity_id: entity,
        item: item.uid,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  /**
   * Toggle every item in a category between completed and needs_action.
   * If every item is already completed we mark them all active again;
   * otherwise we complete the still-active ones. Already-target items
   * are skipped to avoid no-op service calls.
   *
   * Service calls are sent sequentially: HA's todo state-change events
   * arrive between calls and the user sees a quick rolling update,
   * which is friendlier than a parallel burst that could race.
   */
  private async _toggleCategoryAll(items: TodoItem[], allCompleted: boolean): Promise<void> {
    const entity = this._config?.entity;
    if (!entity || !this.hass || items.length === 0) return;
    const target = allCompleted ? "needs_action" : "completed";
    const toUpdate = items.filter((i) => i.status !== target);
    for (const item of toUpdate) {
      try {
        await this.hass.callService("todo", "update_item", {
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
    // New Set so Lit's `@state()` reactivity notices the change.
    const next = new Set(this._collapsedCategories);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._collapsedCategories = next;
  }

  /**
   * Resolve the color for a category by its DISPLAY name. We key on the
   * label that the user sees (and would type into the colors editor) so
   * the General bucket — which has `category: null` internally — still
   * matches an entry like `General: red` in the YAML editor.
   *
   * Lookup order:
   *   1. `cfg.category_colors` if the user set it (even to {}).
   *   2. `DEFAULT_CATEGORY_COLORS` only if the user never set anything.
   */
  private _categoryColor(name: string): string | undefined {
    const cfg = this._config!;
    const map = cfg.category_colors !== undefined ? cfg.category_colors : DEFAULT_CATEGORY_COLORS;
    return map[name];
  }

  /* ─── Inline edit ──────────────────────────────────────────────────── */

  private _startEdit(item: TodoItem): void {
    const enableQuantity = this._config?.enable_quantity ?? false;
    if (enableQuantity) {
      // With quantity ON, split the marker out so the user edits only the
      // name; the stepper handles quantity separately.
      const { name, quantity } = parseQuantity(item.summary);
      this._editDraft = name;
      this._editQuantity = quantity;
    } else {
      // With quantity OFF, treat the summary as opaque text — markers (if
      // any) are shown verbatim and the user can edit them by hand.
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

  /**
   * Commit an edit (name and/or quantity). Safe to call multiple times
   * for the same item — once it completes `_editingUid` is cleared so a
   * stray late blur won't re-fire the service. The new summary is the
   * trimmed name plus an encoded `<quantity: N>` marker when the feature
   * is enabled and N > 1; otherwise it's just the trimmed name.
   */
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

    // Clear editing state before the await so a blur fired by the DOM
    // teardown can't trigger a second service call.
    this._cancelEdit();

    try {
      await this.hass.callService("todo", "update_item", {
        entity_id: entity,
        item: item.uid,
        rename: newSummary,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private _adjustEditQuantity(delta: number): void {
    const max = this._config?.quantity_max ?? 0;
    this._editQuantity = clampQuantity(this._editQuantity + delta, max);
  }

  /* ─── Sorting / filtering ──────────────────────────────────────────── */

  private _sort(items: TodoItem[]): TodoItem[] {
    const sortMode = this._config?.sort;
    if (sortMode === "alpha") {
      return [...items].sort((a, b) => a.summary.localeCompare(b.summary));
    }
    // "manual" / "created" / undefined → preserve HA's order.
    return items;
  }

  /**
   * Split items into the two buckets used by every render mode, applying
   * the configured sort to each bucket independently.
   */
  private _splitItems(): { active: TodoItem[]; completed: TodoItem[] } {
    const active: TodoItem[] = [];
    const completed: TodoItem[] = [];
    for (const item of this._items) {
      if (item.status === "completed") completed.push(item);
      else active.push(item);
    }
    return { active: this._sort(active), completed: this._sort(completed) };
  }

  /**
   * Bucket items by parsed `[Category]` prefix, applying the configured
   * sort both within each group and across groups.
   *
   * Group ordering rules:
   *   - `sort: "alpha"` → groups sorted alphabetically by displayName
   *     (the General bucket sorts naturally with everything else).
   *   - `sort: "manual" | "created"` → first-appearance order in HA's
   *     stream, which puts General wherever its first item lives.
   */
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

  /* ─── Render ───────────────────────────────────────────────────────── */

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;
    const customStyle = this._extractCustomStyle();
    const showAdd = !!(cfg.show_add_input && cfg.entity);
    const position = cfg.add_input_position ?? "bottom";

    return html`
      <ha-card class="sl-card">
        ${cfg.show_header ? this._renderHeader() : nothing}
        ${this._error ? html`<div class="sl-error">${this._error}</div>` : nothing}
        ${showAdd && position === "top" ? this._renderAddRow("top") : nothing} ${this._renderBody()}
        ${showAdd && position !== "top" ? this._renderAddRow("bottom") : nothing}
      </ha-card>
      ${customStyle
        ? html`<style>
            ${customStyle}
          </style>`
        : nothing}
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

    // Compute the items to render in the main list, plus whether we need
    // a collapsed-toggle row at the end.
    let mainItems: TodoItem[];
    let trailingCompleted: TodoItem[] = [];
    let showCollapseToggle = false;

    if (mode === "hide") {
      mainItems = active;
    } else if (mode === "inline") {
      // HA already gives us a single ordered stream; just sort the union.
      mainItems = this._sort([...this._items]);
    } else if (mode === "bottom") {
      mainItems = active;
      trailingCompleted = completed;
    } else {
      // collapse
      mainItems = active;
      showCollapseToggle = completed.length > 0;
      if (this._completedExpanded) trailingCompleted = completed;
    }

    if (mainItems.length === 0 && trailingCompleted.length === 0 && !showCollapseToggle) {
      return html`<div class="sl-empty">${cfg.empty_message}</div>`;
    }

    // Keyed lists: Lit's `repeat` directive uses `item.uid` to track each
    // row across re-renders. Without it Lit recycles DOM nodes positionally,
    // which lets stale DOM state (e.g. an `<input>` the user just toggled
    // before it moved buckets) bleed into the new item that takes its slot.
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

    // In `collapse` mode we lift every completed item out of its group
    // into one global section at the bottom of the card. Once an item is
    // done the user has explicitly told us they don't care about its
    // category any more — keeping per-group collapses on top of an outer
    // category collapse would be visually noisy and harder to operate.
    let globalCompleted: TodoItem[] = [];
    let showGlobalCollapseToggle = false;
    if (mode === "collapse") {
      const allCompleted: TodoItem[] = [];
      for (const g of groups) allCompleted.push(...g.completed);
      globalCompleted = this._sort(allCompleted);
      showGlobalCollapseToggle = globalCompleted.length > 0;
    }

    // Drop groups that would render empty under the current completed mode.
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
        ${showGlobalCollapseToggle
          ? html`
              <ul class="sl-list sl-grouped-completed">
                ${this._renderCompletedToggle(globalCompleted.length)}
                ${this._completedExpanded
                  ? repeat(
                      globalCompleted,
                      (i) => i.uid,
                      // Show the [Category] prefix here — the global
                      // section has no header to anchor categories, so
                      // each row needs its own context cue.
                      (i) => this._renderItem(i, { hidePrefix: false }),
                    )
                  : nothing}
              </ul>
            `
          : nothing}
      </div>
    `;
  }

  private _renderGroup(group: CategoryGroup): TemplateResult {
    const cfg = this._config!;
    const mode = cfg.completed ?? "bottom";

    // Items relevant to the header's check-all state.
    //
    // - In `collapse` mode the completed items are lifted into a global
    //   bottom section, so the header reflects only what's currently
    //   visible inside the group. Completing a visible item moves it
    //   straight into that global section.
    // - In `hide` mode the (hidden) completed items still count toward
    //   the toggle: clicking once should mark the entire category done,
    //   visible or not, to avoid a state where hidden items quietly
    //   leave the toggle stuck off.
    const headerScope = mode === "collapse" ? group.active : [...group.active, ...group.completed];
    const allCompleted =
      headerScope.length > 0 && headerScope.every((i) => i.status === "completed");
    const someCompleted = !allCompleted && headerScope.some((i) => i.status === "completed");

    const showCheckAll = cfg.category_check_all !== false;
    const showCollapseToggle = cfg.category_collapsible !== false;

    const isCollapsed = showCollapseToggle && this._collapsedCategories.has(group.key);

    // Per-group items respecting the global completed mode.
    let groupItems: TodoItem[];
    if (mode === "hide" || mode === "collapse") {
      // collapse: completed items lifted to the global section below.
      groupItems = group.active;
    } else if (mode === "inline") {
      groupItems = this._sort([...group.active, ...group.completed]);
    } else {
      // bottom: active first, then completed inside this group.
      groupItems = [...group.active, ...group.completed];
    }

    // Look up by displayName so the General bucket can be themed under
    // its label (e.g. `General: grey` or, if the user renamed General
    // to "Other", `Other: grey`).
    const colorValue = this._categoryColor(group.displayName);
    const styleAttr = colorValue ? `--shopping-list-category-color: ${colorValue}` : "";

    return html`
      <section class="sl-category" style=${styleAttr}>
        <div class="sl-category-header">
          ${showCheckAll
            ? html`<ha-checkbox
                class="sl-category-checkbox"
                .checked=${allCompleted}
                .indeterminate=${someCompleted}
                @click=${(ev: Event) => ev.stopPropagation()}
                @change=${() => this._toggleCategoryAll(headerScope, allCompleted)}
              ></ha-checkbox>`
            : nothing}
          <button
            class="sl-category-name"
            type="button"
            ?disabled=${!showCollapseToggle}
            aria-expanded=${showCollapseToggle ? (isCollapsed ? "false" : "true") : "true"}
            @click=${showCollapseToggle ? () => this._toggleCategoryCollapse(group.key) : null}
          >
            [${group.displayName}]${cfg.category_show_count !== false && group.active.length > 0
              ? html`<span class="sl-category-count" aria-label="active items"
                  >(${group.active.length})</span
                >`
              : nothing}
          </button>
          ${showCollapseToggle
            ? html`<button
                type="button"
                class="sl-category-collapse"
                aria-label=${isCollapsed ? "Expand category" : "Collapse category"}
                @click=${() => this._toggleCategoryCollapse(group.key)}
              >
                <ha-icon .icon=${isCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"}></ha-icon>
              </button>`
            : nothing}
        </div>
        ${!isCollapsed
          ? html`<ul class="sl-category-items">
              ${repeat(
                groupItems,
                (i) => i.uid,
                (i) => this._renderItem(i, { hidePrefix: true }),
              )}
            </ul>`
          : nothing}
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

    // Two-stage parse:
    //   1. Strip `[Category]` prefix when categories are on, leaving the
    //      rest for quantity-marker parsing.
    //   2. Strip the `<quantity: N>` marker when quantity is on.
    // Both feature flags are independent, so each stage no-ops when its
    // flag is off.
    let nameSource = item.summary;
    let displayCategory: string | null = null;
    if (enableCategories) {
      const parsedCat = parseCategory(item.summary);
      displayCategory = parsedCat.category;
      nameSource = parsedCat.rest;
    }
    const parsed = enableQuantity ? parseQuantity(nameSource) : { name: nameSource, quantity: 1 };
    const showQuantityBadge = enableQuantity && parsed.quantity > 1;

    // The category prefix shows in the row only when categories are on
    // AND we're not inside a grouped layout (the group header already
    // shows the bracket label). Color via the same CSS custom property
    // used by the group header for theme consistency.
    const showCategoryPrefix = enableCategories && !opts?.hidePrefix && !!displayCategory;
    const colorValue = displayCategory ? this._categoryColor(displayCategory) : undefined;
    const itemStyle = colorValue ? `--shopping-list-category-color: ${colorValue}` : "";

    const canDecrement = this._editQuantity > 1;
    const canIncrement = quantityMax <= 0 || this._editQuantity < quantityMax;

    // Used on stepper/save/cancel buttons to suppress the implicit focus
    // shift — otherwise mousedown moves focus off the input which fires
    // `blur`, racing the explicit click handler.
    const suppressBlur = (ev: MouseEvent) => ev.preventDefault();

    return html`
      <li
        class="sl-item ${completed ? "sl-item--completed" : ""} ${isEditing
          ? "sl-item--editing"
          : ""} ${clickToCheck ? "" : "sl-item--no-row-click"}"
        style=${itemStyle}
        @click=${(ev: MouseEvent) => {
          if (!clickToCheck) return;
          if (isEditing) return;
          // Avoid double-toggle when clicking the checkbox itself.
          if ((ev.target as HTMLElement).tagName === "HA-CHECKBOX") return;
          void this._toggleItem(item);
        }}
      >
        <ha-checkbox
          class="sl-checkbox"
          .checked=${completed}
          ?disabled=${isEditing}
          @change=${() => this._toggleItem(item)}
        ></ha-checkbox>

        ${isEditing
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
                // Commit on blur (e.g. user clicks elsewhere on the page).
                // Stepper/save/cancel buttons preventDefault on mousedown
                // so they don't trigger this path.
                if (this._editingUid === item.uid) {
                  void this._saveEdit(item);
                }
              }}
            />`
          : html`<span class="sl-summary">
              ${showCategoryPrefix
                ? html`<span class="sl-category-prefix">[${displayCategory}]</span> `
                : nothing}<span class="sl-name">${parsed.name}</span>${showQuantityBadge
                ? html`<span class="sl-quantity-badge">×${parsed.quantity}</span>`
                : nothing}
            </span>`}
        ${isEditing && enableQuantity
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
          : nothing}

        <div class="sl-actions">
          ${isEditing
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
                ${enableEdit
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
                  : nothing}
                ${enableRemove
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
                  : nothing}
              `}
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

    // Keep the input focused when the user adjusts quantity so they can
    // immediately press Enter to add. Without this, mousedown on the
    // stepper button would steal focus from the input.
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
        ${enableQuantity
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
          : nothing}
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

  /**
   * Allow users to inject custom CSS via either:
   *   style: |
   *     ha-card { ... }
   * or the card-mod compatible:
   *   card_mod:
   *     style: |
   *       ha-card { ... }
   */
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

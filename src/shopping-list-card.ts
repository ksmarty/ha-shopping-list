import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "./ha-types.js";

import { CARD_TAG, CARD_VERSION, DEFAULT_CONFIG, EDITOR_TAG } from "./const.js";
import type { ShoppingListCardConfig, TodoItem } from "./types.js";
import { cardStyles } from "./styles.js";

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
    description: "Work in progress — a Lovelace shopping list card.",
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

  private _unsub?: () => void;
  private _lastEntity?: string;

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
    const entity = this._config?.entity;
    const summary = this._draft.trim();
    if (!entity || !summary || !this.hass) return;
    try {
      await this.hass.callService("todo", "add_item", { entity_id: entity, item: summary });
      this._draft = "";
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
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

  /* ─── Render ───────────────────────────────────────────────────────── */

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;
    const customStyle = this._extractCustomStyle();

    return html`
      <ha-card class="sl-card">
        ${cfg.show_header ? this._renderHeader() : nothing}
        ${this._error ? html`<div class="sl-error">${this._error}</div>` : nothing}
        ${this._renderBody()} ${cfg.show_add_input && cfg.entity ? this._renderAddRow() : nothing}
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

    return html`
      <ul class="sl-list">
        ${mainItems.map((i) => this._renderItem(i))}
        ${showCollapseToggle ? this._renderCompletedToggle(completed.length) : nothing}
        ${trailingCompleted.map((i) => this._renderItem(i))}
      </ul>
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

  private _renderItem(item: TodoItem): TemplateResult {
    const completed = item.status === "completed";
    return html`
      <li
        class="sl-item ${completed ? "sl-item--completed" : ""}"
        @click=${(ev: MouseEvent) => {
          // Avoid double-toggle when clicking the checkbox itself.
          if ((ev.target as HTMLElement).tagName === "HA-CHECKBOX") return;
          void this._toggleItem(item);
        }}
      >
        <ha-checkbox
          class="sl-checkbox"
          .checked=${completed}
          @change=${() => this._toggleItem(item)}
        ></ha-checkbox>
        <span class="sl-summary">${item.summary}</span>
        <ha-icon-button
          class="sl-delete-button"
          .label=${"Remove"}
          @click=${(ev: MouseEvent) => {
            ev.stopPropagation();
            void this._removeItem(item);
          }}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </li>
    `;
  }

  private _renderAddRow(): TemplateResult {
    const cfg = this._config!;
    const canAdd = this._draft.trim().length > 0;
    return html`
      <div class="sl-add-row">
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

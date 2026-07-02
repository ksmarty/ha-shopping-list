import { LitElement, html, css, unsafeCSS, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "./ha-types.js";

import { DEFAULT_CONFIG, EDITOR_TAG } from "./const.js";
import {
  DEFAULT_CATEGORY_COLORS,
  parseCategoryColors,
  stringifyCategoryColors,
} from "./categories.js";
import type {
  AddInputPosition,
  CompletedDisplay,
  ShoppingListCardConfig,
  SortMode,
} from "./types.js";

/**
 * Schema items match the shape `<ha-form>` understands. We support two
 * kinds:
 *   - Leaf items with a `selector`
 *   - Expandable group items with `type: "expandable"` and a nested
 *     `schema`. We always pass `flatten: true` so the underlying data
 *     stays flat in YAML — groups are purely a UI construct.
 */
type LeafSchemaItem = {
  name: string;
  selector: Record<string, unknown>;
  required?: boolean;
};
type ExpandableSchemaItem = {
  type: "expandable";
  name: string;
  title?: string;
  icon?: string;
  expanded?: boolean;
  flatten?: boolean;
  schema: SchemaItem[];
};
type SchemaItem = LeafSchemaItem | ExpandableSchemaItem;

/**
 * `<ha-code-editor>` only ships language packs for `yaml` and `jinja2`
 * (see frontend/src/resources/codemirror.ts → `langs`). Passing any
 * other mode resolves to `undefined`, which CodeMirror then crashes on
 * inside its compartment resolver with `can't access property
 * "extension", t is undefined`.
 *
 * For free-form text like Custom CSS we therefore use `yaml` — its
 * highlighter degrades gracefully on non-YAML input (mostly plain text)
 * and gives us a working editor instead of an inert element.
 */
const CODE_EDITOR_MODE = "yaml" as const;

/**
 * Tight vertical gap between top-level sections (the ha-form expandable
 * groups + our custom Categories / Customization details blocks).
 * Used both as our own margin-top on the custom blocks and injected
 * into ha-form's shadow root to override its default 24px row gap.
 */
const SECTION_GAP_PX = 8;

const SORT_OPTIONS = [
  { value: "manual", label: "Manual (HA order)" },
  { value: "alpha", label: "Alphabetical" },
  { value: "created", label: "Created order" },
];

const COMPLETED_OPTIONS = [
  { value: "bottom", label: "At the bottom of the list" },
  { value: "inline", label: "Mixed with active items" },
  { value: "collapse", label: "Collapsible section" },
  { value: "hide", label: "Hide completed items" },
];

const ADD_INPUT_POSITION_OPTIONS = [
  { value: "bottom", label: "Bottom (below the list)" },
  { value: "top", label: "Top (below the header)" },
];

const SCHEMA: SchemaItem[] = [
  // Top-level: entity selector lives outside any group.
  { name: "entity", required: true, selector: { entity: { domain: "todo" } } },

  {
    type: "expandable",
    name: "_grp_header",
    title: "Header",
    icon: "mdi:format-title",
    flatten: true,
    schema: [
      { name: "show_header", selector: { boolean: {} } },
      { name: "title", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ],
  },

  {
    type: "expandable",
    name: "_grp_list",
    title: "To-do items",
    icon: "mdi:format-list-bulleted",
    flatten: true,
    schema: [
      { name: "sort", selector: { select: { mode: "dropdown", options: SORT_OPTIONS } } },
      { name: "click_to_check", selector: { boolean: {} } },
      { name: "enable_edit", selector: { boolean: {} } },
      { name: "enable_remove", selector: { boolean: {} } },
      { name: "enable_reorder", selector: { boolean: {} } },
      { name: "empty_message", selector: { text: {} } },
    ],
  },

  {
    type: "expandable",
    name: "_grp_quantity",
    title: "Quantities",
    icon: "mdi:counter",
    flatten: true,
    schema: [
      { name: "enable_quantity", selector: { boolean: {} } },
      {
        name: "quantity_max",
        selector: { number: { min: 0, max: 9999, step: 1, mode: "box" } },
      },
    ],
  },

  {
    type: "expandable",
    name: "_grp_layout",
    title: "Layout",
    icon: "mdi:view-quilt",
    flatten: true,
    schema: [{ name: "fill_screen", selector: { boolean: {} } }],
  },

  {
    type: "expandable",
    name: "_grp_completed",
    title: "Completed items",
    icon: "mdi:check-circle-outline",
    flatten: true,
    schema: [
      {
        name: "completed",
        selector: { select: { mode: "dropdown", options: COMPLETED_OPTIONS } },
      },
      { name: "completed_label", selector: { text: {} } },
    ],
  },

  {
    type: "expandable",
    name: "_grp_add",
    title: "Add items",
    icon: "mdi:plus-circle-outline",
    flatten: true,
    schema: [
      { name: "show_add_input", selector: { boolean: {} } },
      {
        name: "add_input_position",
        selector: { select: { mode: "dropdown", options: ADD_INPUT_POSITION_OPTIONS } },
      },
      { name: "add_button_label", selector: { text: {} } },
    ],
  },
];

// Rendered separately from the main ha-form so we can keep the
// category-color YAML editor inside the same expandable block. The
// individual selectors here still feed back into `_formValueChanged`
// just like the main form's fields do — both forms share the same
// flat data shape and the same change handler.
const CATEGORIES_SCHEMA: SchemaItem[] = [
  { name: "enable_categories", selector: { boolean: {} } },
  { name: "group_by_category", selector: { boolean: {} } },
  { name: "category_collapsible", selector: { boolean: {} } },
  { name: "category_check_all", selector: { boolean: {} } },
  { name: "category_show_count", selector: { boolean: {} } },
  { name: "general_category_label", selector: { text: {} } },
];

@customElement(EDITOR_TAG)
export class ShoppingListCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ShoppingListCardConfig;

  public setConfig(config: ShoppingListCardConfig): void {
    this._config = config;
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    this._patchHaFormSpacing();
  }

  /**
   * `<ha-form>` puts a 24px gap between every section in its shadow DOM
   * (`.root > *:not([own-margin]):not(:last-child) { margin-bottom: 24px }`),
   * which is wider than what we want for this editor and can't be
   * overridden from outside via normal CSS — only the root itself is
   * exposed as a `::part`, not its children, and there's no CSS
   * variable to hook.
   *
   * We pierce the encapsulation deliberately, once per ha-form
   * instance, by appending a small stylesheet to its shadow root. The
   * injection is idempotent (gated on a marker attribute) and only
   * affects the *outer* form because nested ha-form instances inside
   * each `ha-form-expandable` have their own isolated shadow roots.
   *
   * Worst case if HA renames `.root` in a future release: sections
   * fall back to the upstream 24px spacing — no functional breakage.
   */
  private _patchHaFormSpacing(): void {
    for (const form of this.renderRoot.querySelectorAll("ha-form")) {
      const root = form.shadowRoot;
      if (!root) continue;
      if (root.querySelector("style[data-sl-spacing]")) continue;
      const style = document.createElement("style");
      style.setAttribute("data-sl-spacing", "");
      style.textContent = `.root > *:not([own-margin]):not(:last-child) { margin-bottom: ${SECTION_GAP_PX}px !important; }`;
      root.appendChild(style);
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    /* Visual match for the Customization section so it sits naturally
       below HA's native ha-form expandable groups.

       - Background is transparent: HA's own expandables (rendered by
         ha-form for "expandable" schema items) inherit the parent
         dialog background, so any explicit color visibly mismatches.
       - margin-top is the same SECTION_GAP_PX value injected into
         ha-form's shadow root by _patchHaFormSpacing, so every section
         (HA's expandables + our custom blocks) sits the same distance
         apart. */
    .customization {
      display: block;
      margin-top: ${unsafeCSS(`${SECTION_GAP_PX}px`)};
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      background: transparent;
      overflow: hidden;
    }
    .customization > summary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
      list-style: none;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .customization > summary::-webkit-details-marker {
      display: none;
    }
    .customization > summary ha-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .customization > summary .chevron {
      margin-left: auto;
      transition: transform 200ms ease;
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
    }
    .customization[open] > summary .chevron {
      transform: rotate(180deg);
    }
    .customization-body {
      padding: 0 16px 16px;
    }
    .customization-body .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0 0 6px;
    }
    /* Categories ha-form sits inside a custom <details>; tighten its
       default vertical rhythm so it visually belongs with the YAML editor
       and the example block beneath it. */
    .categories-form {
      margin-bottom: 4px;
    }
    ha-code-editor {
      --code-mirror-max-height: 240px;
    }
  `;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    // Merge defaults under the user's config so toggles/selects reflect
    // the card's actual behavior even when the user hasn't explicitly set
    // a field. Saved YAML stays clean — see `_formValueChanged` for the
    // diff-based persistence logic.
    const formData = { ...DEFAULT_CONFIG, ...this._config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${SCHEMA}
        .computeLabel=${this._labelFor}
        @value-changed=${this._formValueChanged}
      ></ha-form>

      <details class="customization">
        <summary>
          <ha-icon icon="mdi:tag-multiple-outline"></ha-icon>
          <span>Categories</span>
          <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="customization-body">
          <p class="hint">
            Prefix an item with <code>[Category]</code> to bucket it — e.g.
            <code>[Veggies] Lettuce</code>. Brackets are required; items without them land in the
            <em>General</em> bucket.
          </p>
          <ha-form
            class="categories-form"
            .hass=${this.hass}
            .data=${formData}
            .schema=${CATEGORIES_SCHEMA}
            .computeLabel=${this._labelFor}
            @value-changed=${this._formValueChanged}
          ></ha-form>

          <p class="hint">
            <strong>Category colors.</strong> One <code>Name: color</code> per line. Any CSS color
            works — named (<code>green</code>), hex (<code>"#171717"</code>), <code>rgb()</code>, or
            <code>var(--my-token)</code>. Categories without a mapping use the current text color.
            Clear the editor to remove all colors.
          </p>
          <ha-code-editor
            .mode=${CODE_EDITOR_MODE}
            .value=${stringifyCategoryColors(
              this._config.category_colors !== undefined
                ? this._config.category_colors
                : DEFAULT_CATEGORY_COLORS,
            )}
            @value-changed=${this._categoryColorsChanged}
          ></ha-code-editor>
        </div>
      </details>

      <details class="customization">
        <summary>
          <ha-icon icon="mdi:palette-outline"></ha-icon>
          <span>Customization</span>
          <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="customization-body">
          <p class="hint">
            Custom CSS appended to the card. Target <code>.sl-*</code> classes or override
            <code>--shopping-list-*</code> variables.
          </p>
          <ha-code-editor
            .mode=${CODE_EDITOR_MODE}
            .value=${typeof this._config.style === "string" ? this._config.style : ""}
            @value-changed=${this._styleChanged}
          ></ha-code-editor>
        </div>
      </details>
    `;
  }

  private _labelFor = (schema: SchemaItem): string => {
    if ("type" in schema && schema.type === "expandable") {
      return schema.title ?? schema.name;
    }
    const map: Record<string, string> = {
      entity: "Todo Entity (required)",
      title: "Title",
      icon: "Icon",
      show_header: "Show header",
      completed: "Show completed items",
      completed_label: "Completed group label",
      show_add_input: "Show add-item input",
      add_input_position: "Add bar position",
      add_button_label: "Add button label",
      empty_message: "Empty list message",
      sort: "Sort order",
      click_to_check: "Click row to check/uncheck",
      enable_edit: "Allow editing items",
      enable_remove: "Allow removing items",
      enable_quantity: "Enable quantities",
      quantity_max: "Maximum quantity (0 = unlimited)",
      enable_categories: "Enable categories",
      group_by_category: "Group items by category",
      category_collapsible: "Allow collapsing categories",
      category_check_all: "Allow check-all on categories",
      category_show_count: "Show item count on category headers",
      general_category_label: "Label for uncategorized items",
      fill_screen: "Fill the screen (use full available height)",
      enable_reorder: "Allow drag-and-drop reorder",
    };
    return map[schema.name] ?? schema.name;
  };

  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const data = ev.detail.value as Partial<ShoppingListCardConfig> & {
      sort?: SortMode;
      completed?: CompletedDisplay;
      add_input_position?: AddInputPosition;
    };

    // Persist only fields the user actually intends to set:
    //   - Fields already present in the user's existing config (update)
    //   - Fields whose new value differs from the built-in default
    //
    // ha-form sends back values for every visible field — including ones
    // we merged in for display purposes. Without this filter, the very
    // first toggle would balloon the saved YAML with all defaults.
    const existing = this._config as Record<string, unknown>;
    const defaults = DEFAULT_CONFIG as Record<string, unknown>;
    const newConfig: ShoppingListCardConfig = { ...this._config };

    for (const [key, value] of Object.entries(data)) {
      const wasExplicit = key in existing;
      const matchesDefault = value === defaults[key];
      if (wasExplicit || !matchesDefault) {
        (newConfig as Record<string, unknown>)[key] = value;
      }
    }

    // Drop the deprecated boolean once the user touches the editor so we
    // don't keep two sources of truth in the saved YAML.
    if ("show_completed" in newConfig) delete newConfig.show_completed;
    this._fireChange(newConfig);
  }

  private _styleChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const value = ev.detail?.value ?? "";
    const newConfig: ShoppingListCardConfig = { ...this._config, style: value };
    if (!value) delete newConfig.style;
    this._fireChange(newConfig);
  }

  /**
   * Parse the YAML-ish text from the code editor and persist it under
   * `category_colors`. Always saves the parsed result — including an
   * empty `{}` — to make "I cleared this on purpose" a distinct state
   * from "I never touched it". The latter (key absent) is the only
   * state that triggers DEFAULT_CATEGORY_COLORS at runtime, so deleting
   * on empty would bounce the editor back to the defaults the moment
   * the user finishes wiping it.
   */
  private _categoryColorsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const text = (ev.detail?.value as string) ?? "";
    const parsed = parseCategoryColors(text);
    const newConfig: ShoppingListCardConfig = { ...this._config, category_colors: parsed };
    this._fireChange(newConfig);
  }

  private _fireChange(config: ShoppingListCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: ShoppingListCardEditor;
  }
}

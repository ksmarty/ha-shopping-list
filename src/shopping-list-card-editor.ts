import { LitElement, html, css, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "./ha-types.js";

import { EDITOR_TAG } from "./const.js";
import type { CompletedDisplay, ShoppingListCardConfig, SortMode } from "./types.js";

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
      { name: "empty_message", selector: { text: {} } },
    ],
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
      { name: "add_button_label", selector: { text: {} } },
    ],
  },
];

@customElement(EDITOR_TAG)
export class ShoppingListCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ShoppingListCardConfig;

  public setConfig(config: ShoppingListCardConfig): void {
    this._config = config;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    /* Visual match for the Customization section so it sits naturally
       below HA's native ha-form expandable groups. */
    .customization {
      display: block;
      margin-top: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      background: var(--card-background-color, var(--ha-card-background, transparent));
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
    ha-code-editor {
      --code-mirror-max-height: 240px;
    }
  `;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._labelFor}
        @value-changed=${this._formValueChanged}
      ></ha-form>

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
            mode="css"
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
      add_button_label: "Add button label",
      empty_message: "Empty list message",
      sort: "Sort order",
    };
    return map[schema.name] ?? schema.name;
  };

  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const data = ev.detail.value as Partial<ShoppingListCardConfig> & {
      sort?: SortMode;
      completed?: CompletedDisplay;
    };
    const newConfig: ShoppingListCardConfig = { ...this._config, ...data };
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

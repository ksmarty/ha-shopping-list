import { LitElement, html, css, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "./ha-types.js";

import { EDITOR_TAG } from "./const.js";
import type { CompletedDisplay, ShoppingListCardConfig, SortMode } from "./types.js";

interface SchemaItem {
  name: string;
  selector: Record<string, unknown>;
  required?: boolean;
}

const SCHEMA: SchemaItem[] = [
  { name: "entity", required: true, selector: { entity: { domain: "todo" } } },
  { name: "title", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "show_header", selector: { boolean: {} } },
  {
    name: "completed",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "bottom", label: "At the bottom of the list" },
          { value: "inline", label: "Mixed with active items" },
          { value: "collapse", label: "Collapsible section" },
          { value: "hide", label: "Hide completed items" },
        ],
      },
    },
  },
  { name: "completed_label", selector: { text: {} } },
  { name: "show_add_input", selector: { boolean: {} } },
  { name: "add_button_label", selector: { text: {} } },
  { name: "empty_message", selector: { text: {} } },
  {
    name: "sort",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "manual", label: "Manual (HA order)" },
          { value: "alpha", label: "Alphabetical" },
          { value: "created", label: "Created order" },
        ],
      },
    },
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
    .group {
      margin-top: 12px;
    }
    .group-title {
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
    }
    ha-code-editor {
      --code-mirror-max-height: 200px;
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

      <div class="group">
        <div class="group-title">Custom CSS (advanced)</div>
        <ha-code-editor
          mode="css"
          .value=${typeof this._config.style === "string" ? this._config.style : ""}
          @value-changed=${this._styleChanged}
        ></ha-code-editor>
      </div>
    `;
  }

  private _labelFor = (schema: SchemaItem): string => {
    const map: Record<string, string> = {
      entity: "Todo Entity (required)",
      title: "Title",
      icon: "Icon",
      show_header: "Show header",
      completed: "Completed items",
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

/**
 * Minimal stand-ins for the Home Assistant web components used by the card.
 *
 * These do NOT look or behave exactly like the real HA elements — they exist
 * so that the card can mount, render, and respond to user input outside HA.
 * Use HA itself for visual fidelity / accessibility verification.
 */

class HaCard extends HTMLElement {
  connectedCallback() {
    this.style.background = "var(--ha-card-background, var(--card-background-color, #1f1f1f))";
    this.style.color = "var(--primary-text-color, #e1e1e1)";
    this.style.borderRadius = "12px";
    this.style.padding = "0";
    this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  }
}
customElements.define("ha-card", HaCard);

class HaCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled"];
  }
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; cursor: pointer; }
        input { width: 18px; height: 18px; cursor: pointer; accent-color: var(--mdc-theme-secondary, #03a9f4); }
      </style>
      <input type="checkbox" />
    `;
    this._input = root.querySelector("input");
    this._input.addEventListener("change", () => {
      this._checked = this._input.checked;
      // Click clears indeterminate in real HA too — match that here so the
      // visual state matches a fresh checked/unchecked after user input.
      this._indeterminate = false;
      this._input.indeterminate = false;
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  set checked(v) {
    this._checked = !!v;
    if (this._input) this._input.checked = this._checked;
  }
  get checked() {
    return this._input ? this._input.checked : !!this._checked;
  }
  // The category check-all uses the indeterminate state to communicate
  // "some but not all items in this group are completed". Real <ha-checkbox>
  // exposes this as a property; the stub follows suit.
  set indeterminate(v) {
    this._indeterminate = !!v;
    if (this._input) this._input.indeterminate = this._indeterminate;
  }
  get indeterminate() {
    return this._input ? this._input.indeterminate : !!this._indeterminate;
  }
}
customElements.define("ha-checkbox", HaCheckbox);

class HaTextfield extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-flex; flex: 1; }
        input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--divider-color, #444);
          border-radius: 6px;
          background: var(--card-background-color, #2a2a2a);
          color: var(--primary-text-color, #e1e1e1);
          font: inherit;
        }
        input:focus { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: -2px; }
      </style>
      <input type="text" />
    `;
    this._input = root.querySelector("input");
    this._input.addEventListener("input", (ev) => {
      this.value = this._input.value;
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    });
    this._input.addEventListener("keydown", (ev) => {
      this.dispatchEvent(
        new KeyboardEvent("keydown", { key: ev.key, bubbles: true, composed: true }),
      );
    });
  }
  set value(v) {
    if (this._input && this._input.value !== v) this._input.value = v ?? "";
  }
  get value() {
    return this._input ? this._input.value : "";
  }
  set placeholder(v) {
    if (this._input) this._input.placeholder = v ?? "";
  }
}
customElements.define("ha-textfield", HaTextfield);

/**
 * Renders Material Design Icons via the @mdi/font webfont.
 *
 * Why shadow DOM here: <ha-icon> is rendered inside the card's own
 * Lit shadow root. Stylesheets in the document <head> do NOT pierce
 * shadow DOM boundaries, so the global @mdi/font CSS would never reach
 * an icon nested in the card. Each <ha-icon> therefore needs its own
 * shadow root with a <link> to the MDI stylesheet (browsers cache the
 * actual CSS file across all instances).
 *
 * Falls back to showing the icon name as text for non-MDI icons.
 */
const MDI_CSS_URL = "https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css";

class HaIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.style.display = "inline-flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
    this.style.width = "var(--mdc-icon-size, 24px)";
    this.style.height = "var(--mdc-icon-size, 24px)";
    this.style.verticalAlign = "middle";
    this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  set icon(v) {
    this.setAttribute("icon", v);
  }
  get icon() {
    return this.getAttribute("icon");
  }
  _render() {
    const icon = this.getAttribute("icon") || "";
    this.title = icon;
    if (icon.startsWith("mdi:")) {
      const name = icon.slice(4);
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${MDI_CSS_URL}">
        <style>
          :host { display: inline-flex; }
          i {
            font-size: var(--mdc-icon-size, 24px);
            line-height: 1;
            color: currentColor;
          }
        </style>
        <i class="mdi mdi-${name}" aria-hidden="true"></i>
      `;
    } else if (icon) {
      this.shadowRoot.innerHTML = `<span style="font-size: 11px; opacity: 0.7;">${icon}</span>`;
    } else {
      this.shadowRoot.innerHTML = "";
    }
  }
}
customElements.define("ha-icon", HaIcon);

class HaIconButton extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--mdc-icon-button-size, 36px);
          height: var(--mdc-icon-button-size, 36px);
          border-radius: 50%;
          cursor: pointer;
          background: transparent;
          color: inherit;
        }
        :host(:hover) { background: rgba(255,255,255,0.08); }
      </style>
      <slot></slot>
    `;
  }
}
customElements.define("ha-icon-button", HaIconButton);

class MwcButton extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          border-radius: 6px;
          background: var(--primary-color, #03a9f4);
          color: white;
          cursor: pointer;
          font: inherit;
          font-weight: 500;
          user-select: none;
        }
        :host(:hover) { filter: brightness(1.1); }
      </style>
      <slot></slot>
    `;
  }
}
customElements.define("mwc-button", MwcButton);

/* --- Editor-only stubs ------------------------------------------------- */

/**
 * Extremely simplified `ha-form` stub.
 *
 * Supports two schema item shapes:
 *   - Leaf: `{ name, selector }` rendered as a labeled <input>/<select>.
 *   - Group: `{ type: "expandable", title, schema }` rendered as <details>.
 *
 * On any change it emits a single `value-changed` event with the FLAT
 * merged data, mirroring real ha-form when groups have `flatten: true`.
 */
class HaForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  set hass(_v) {
    /* unused */
  }
  set data(v) {
    this._data = { ...(v || {}) };
    this._render();
  }
  set schema(v) {
    this._schema = v || [];
    this._render();
  }
  set computeLabel(fn) {
    this._computeLabel = fn;
    this._render();
  }
  _renderItem(item) {
    if (item.type === "expandable") {
      const inner = (item.schema || []).map((sub) => this._renderItem(sub)).join("");
      const open = item.expanded ? "open" : "";
      const title = item.title || item.name;
      return `
        <details class="group" ${open}>
          <summary>
            <span class="group-icon" aria-hidden="true">▸</span>
            <span class="group-title">${title}</span>
          </summary>
          <div class="group-body">${inner}</div>
        </details>
      `;
    }
    const label = this._computeLabel ? this._computeLabel(item) : item.name;
    const val = this._data?.[item.name] ?? "";
    const sel = item.selector || {};
    let input;
    if (sel.boolean) {
      input = `<input type="checkbox" data-name="${item.name}" ${val ? "checked" : ""} />`;
    } else if (sel.select) {
      const opts = (sel.select.options || [])
        .map(
          (o) =>
            `<option value="${o.value}" ${o.value === val ? "selected" : ""}>${o.label}</option>`,
        )
        .join("");
      input = `<select data-name="${item.name}">${opts}</select>`;
    } else if (sel.number) {
      // `data-coerce="number"` tells _fire() to convert the .value string
      // back to a Number so the saved config matches what real HA emits.
      const attrs = [
        sel.number.min !== undefined ? `min="${sel.number.min}"` : "",
        sel.number.max !== undefined ? `max="${sel.number.max}"` : "",
        sel.number.step !== undefined ? `step="${sel.number.step}"` : "",
      ]
        .filter(Boolean)
        .join(" ");
      input = `<input type="number" data-name="${item.name}" data-coerce="number" value="${val}" ${attrs} />`;
    } else {
      input = `<input type="text" data-name="${item.name}" value="${String(val).replace(/"/g, "&quot;")}" />`;
    }
    return `<label class="row">
      <span class="row-label">${label}</span>
      ${input}
    </label>`;
  }
  _render() {
    if (!this._schema) return;
    const body = this._schema.map((item) => this._renderItem(item)).join("");
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .row { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
        .row-label { flex: 0 0 160px; color: var(--secondary-text-color, #aaa); font-size: 13px; }
        input[type=text], select {
          padding: 5px 9px; flex: 1;
          background: var(--card-background-color, #2a2a2a);
          color: var(--primary-text-color, #e1e1e1);
          border: 1px solid var(--divider-color, #444);
          border-radius: 4px;
          font: inherit;
        }
        .group {
          margin: 8px 0;
          border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
          border-radius: 8px;
          background: var(--card-background-color, transparent);
          overflow: hidden;
        }
        .group > summary {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; cursor: pointer; user-select: none;
          font-weight: 500; list-style: none;
          color: var(--primary-text-color);
        }
        .group > summary::-webkit-details-marker { display: none; }
        .group-icon {
          display: inline-block;
          transition: transform 180ms ease;
          color: var(--secondary-text-color);
          font-size: 12px;
          width: 12px; text-align: center;
        }
        .group[open] > summary > .group-icon { transform: rotate(90deg); }
        .group-body { padding: 4px 14px 12px; }
      </style>
      ${body}
    `;
    this.shadowRoot.querySelectorAll("[data-name]").forEach((el) => {
      el.addEventListener("change", () => this._fire());
      el.addEventListener("input", () => this._fire());
    });
  }
  _fire() {
    const next = { ...this._data };
    this.shadowRoot.querySelectorAll("[data-name]").forEach((el) => {
      const name = el.getAttribute("data-name");
      let value = el.type === "checkbox" ? el.checked : el.value;
      if (el.getAttribute("data-coerce") === "number") {
        const n = Number(value);
        value = Number.isFinite(n) ? n : 0;
      }
      next[name] = value;
    });
    this._data = next;
    this.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: next }, bubbles: true, composed: true }),
    );
  }
}
customElements.define("ha-form", HaForm);

class HaCodeEditor extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: block; }
        textarea {
          width: 100%; min-height: 120px;
          background: #1a1a1a; color: #d0d0d0;
          border: 1px solid #444; border-radius: 4px;
          font: 13px/1.4 ui-monospace, monospace; padding: 8px;
          resize: vertical;
        }
      </style>
      <textarea></textarea>
    `;
    this._ta = root.querySelector("textarea");
    this._ta.addEventListener("input", () => {
      this.dispatchEvent(
        new CustomEvent("value-changed", {
          detail: { value: this._ta.value },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
  set value(v) {
    if (!this._ta) return;
    // Don't stomp on a focused editor. Real HA's <ha-code-editor> is
    // built on CodeMirror, which diffs internal state on `.value =`
    // without disturbing the cursor; this <textarea> stub doesn't have
    // that affordance, so we skip the assignment while focused. The
    // categories YAML editor specifically needs this — its parse →
    // serialize round-trip isn't identity (incomplete lines drop), and
    // re-pushing the serialized form mid-typing would lose progress.
    if (document.activeElement === this) return;
    if (this._ta.value !== v) this._ta.value = v ?? "";
  }
  get value() {
    return this._ta?.value ?? "";
  }
  set mode(_m) {
    /* ignored */
  }
}
customElements.define("ha-code-editor", HaCodeEditor);

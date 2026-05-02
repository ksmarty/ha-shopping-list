import { css } from "lit";

/**
 * ════════════════════════════════════════════════════════════════════════
 *  Shopping List Card · Styles
 * ════════════════════════════════════════════════════════════════════════
 *
 * Every visual property is routed through a CSS custom property so the
 * card can be restyled via:
 *   - HA themes (theme YAML)
 *   - the `style:` config option
 *   - `card_mod:` style block
 *   - parent cards (Bubble Card "custom" slot, etc.)
 *
 * ── Light / dark mode strategy ────────────────────────────────────────
 *
 * We never hard-code colors. Instead we lean on HA's `--rgb-*` theme
 * variables (e.g. `--rgb-primary-text-color`) and alpha-blend them. The
 * same rule reads as "subtle white tint" in dark mode and "subtle black
 * tint" in light mode automatically:
 *
 *     background: rgba(var(--rgb-primary-text-color), 0.05);
 *
 * ── Class namespace ───────────────────────────────────────────────────
 *
 * Every targetable element has an `sl-*` class so users can write:
 *
 *     style: |
 *       .sl-item { ... }
 *       .sl-input:focus { ... }
 *
 * Class list:
 *   .sl-card                — root <ha-card>
 *   .sl-header              — header row
 *   .sl-icon                — header icon
 *   .sl-title               — header title text
 *   .sl-error               — error message banner
 *   .sl-empty               — empty / loading message
 *   .sl-list                — <ul> wrapping items
 *   .sl-item                — single item row
 *   .sl-item--completed     — modifier on completed items
 *   .sl-checkbox            — item checkbox
 *   .sl-summary             — item label text
 *   .sl-delete-button       — per-item delete button
 *   .sl-add-row             — bottom add-item row
 *   .sl-input               — add-item text input
 *   .sl-add-button          — add-item submit button
 *   .sl-completed-toggle    — "Completed (N)" expandable header row
 *     .sl-completed-toggle--expanded — modifier when section is open
 *   .sl-completed-toggle-icon  — chevron icon inside the toggle row
 *   .sl-completed-toggle-label — text label inside the toggle row
 */
export const cardStyles = css`
  /* ─── Tokens ─────────────────────────────────────────────────── */
  :host {
    /* Surface tokens — alpha-blended foreground for subtle pills /
       dividers / hover states. Works in both dark and light themes. */
    --shopping-list-pill-bg: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    --shopping-list-pill-bg-hover: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    --shopping-list-pill-border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);

    /* Card chrome */
    --shopping-list-bg: var(--ha-card-background, var(--card-background-color, white));
    --shopping-list-fg: var(--primary-text-color, #212121);
    --shopping-list-muted: var(--secondary-text-color, #727272);
    --shopping-list-accent: var(--primary-color, #03a9f4);
    --shopping-list-error: var(--error-color, #db4437);
    --shopping-list-radius: 20px;
    --shopping-list-padding: 16px;
    --shopping-list-gap: 4px;

    /* Shared "inner element" radius — used by items, input, button so
       they all relate to each other and to the outer card. Override
       this single variable to retune the whole interior at once.
       Use 999px here for the full-pill aesthetic. */
    --shopping-list-inner-radius: 14px;

    /* Header */
    --shopping-list-header-gap: 10px;
    --shopping-list-header-padding: 4px 8px 8px;
    --shopping-list-header-icon-size: 22px;
    --shopping-list-header-icon-color: currentColor;
    --shopping-list-header-font-size: 1.1rem;
    --shopping-list-header-font-weight: 500;

    /* Items */
    --shopping-list-item-bg: var(--shopping-list-pill-bg);
    --shopping-list-item-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-item-radius: var(--shopping-list-inner-radius);
    --shopping-list-item-padding: 8px 12px;
    --shopping-list-item-gap: 12px;
    --shopping-list-list-gap: 4px;

    /* Completed items */
    --shopping-list-completed-fg: var(--disabled-text-color, #bdbdbd);
    --shopping-list-completed-decoration: line-through;

    /* Completed-section toggle (collapse mode) */
    --shopping-list-completed-toggle-bg: transparent;
    --shopping-list-completed-toggle-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-completed-toggle-fg: var(--shopping-list-muted);
    --shopping-list-completed-toggle-padding: 6px 10px;
    --shopping-list-completed-toggle-radius: var(--shopping-list-inner-radius);
    --shopping-list-completed-toggle-font-size: 0.85rem;
    --shopping-list-completed-toggle-font-weight: 500;
    --shopping-list-completed-toggle-icon-size: 18px;
    --shopping-list-completed-toggle-margin: 6px 0 0;

    /* Input */
    --shopping-list-input-bg: var(--shopping-list-pill-bg);
    --shopping-list-input-bg-focus: var(--shopping-list-pill-bg-hover);
    --shopping-list-input-fg: var(--shopping-list-fg);
    --shopping-list-input-placeholder: var(--shopping-list-muted);
    --shopping-list-input-border: var(--shopping-list-pill-border);
    --shopping-list-input-border-focus: 1px solid var(--shopping-list-accent);
    --shopping-list-input-radius: var(--shopping-list-inner-radius);
    --shopping-list-input-padding: 10px 14px;
    --shopping-list-input-font-size: 0.95rem;

    /* Add button */
    --shopping-list-button-bg: var(--shopping-list-accent);
    --shopping-list-button-fg: var(--text-primary-color, white);
    --shopping-list-button-radius: var(--shopping-list-inner-radius);
    --shopping-list-button-padding: 10px 16px;
    --shopping-list-button-font-size: 0.95rem;
    --shopping-list-button-font-weight: 500;

    /* Empty / loading */
    --shopping-list-empty-fg: var(--shopping-list-muted);
    --shopping-list-empty-padding: 16px 8px;

    /* Layout */
    --shopping-list-add-row-gap: 8px;
    --shopping-list-add-row-margin: 8px 0 0;

    display: block;
  }

  /* ─── Card chrome ─────────────────────────────────────────────── */
  .sl-card {
    background: var(--shopping-list-bg);
    color: var(--shopping-list-fg);
    border-radius: var(--shopping-list-radius);
    padding: var(--shopping-list-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-gap);
  }

  /* ─── Header ──────────────────────────────────────────────────── */
  .sl-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-header-gap);
    padding: var(--shopping-list-header-padding);
    font-size: var(--shopping-list-header-font-size);
    font-weight: var(--shopping-list-header-font-weight);
  }

  .sl-icon {
    --mdc-icon-size: var(--shopping-list-header-icon-size);
    color: var(--shopping-list-header-icon-color);
  }

  /* ─── Banners (empty / error) ─────────────────────────────────── */
  .sl-empty {
    color: var(--shopping-list-empty-fg);
    font-style: italic;
    padding: var(--shopping-list-empty-padding);
    text-align: center;
  }

  .sl-error {
    color: var(--shopping-list-error);
    background: rgba(var(--rgb-error-color, 219, 68, 55), 0.08);
    border-radius: var(--shopping-list-inner-radius);
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  /* ─── List + items ────────────────────────────────────────────── */
  .sl-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-list-gap);
  }

  .sl-item {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-item-gap);
    padding: var(--shopping-list-item-padding);
    border-radius: var(--shopping-list-item-radius);
    background: var(--shopping-list-item-bg);
    cursor: pointer;
    user-select: none;
    transition:
      background 120ms ease,
      transform 80ms ease;
  }
  .sl-item:hover {
    background: var(--shopping-list-item-bg-hover);
  }
  .sl-item:active {
    transform: scale(0.99);
  }

  .sl-item--completed .sl-summary {
    color: var(--shopping-list-completed-fg);
    text-decoration: var(--shopping-list-completed-decoration);
  }

  .sl-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -8px;
  }

  .sl-summary {
    flex: 1;
    word-break: break-word;
  }

  .sl-delete-button {
    --mdc-icon-button-size: 32px;
    --mdc-icon-size: 18px;
    color: var(--shopping-list-muted);
    opacity: 0;
    transition: opacity 120ms ease;
  }
  .sl-item:hover .sl-delete-button,
  .sl-item:focus-within .sl-delete-button {
    opacity: 1;
  }

  /* ─── Completed section toggle (collapse mode) ─────────────────── */
  .sl-completed-toggle {
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--shopping-list-item-gap);
    padding: var(--shopping-list-completed-toggle-padding);
    margin: var(--shopping-list-completed-toggle-margin);
    border-radius: var(--shopping-list-completed-toggle-radius);
    background: var(--shopping-list-completed-toggle-bg);
    color: var(--shopping-list-completed-toggle-fg);
    font-size: var(--shopping-list-completed-toggle-font-size);
    font-weight: var(--shopping-list-completed-toggle-font-weight);
    cursor: pointer;
    user-select: none;
    transition: background 120ms ease;
  }
  .sl-completed-toggle:hover,
  .sl-completed-toggle:focus-visible {
    background: var(--shopping-list-completed-toggle-bg-hover);
    outline: none;
  }
  .sl-completed-toggle-icon {
    --mdc-icon-size: var(--shopping-list-completed-toggle-icon-size);
    color: currentColor;
    flex-shrink: 0;
  }
  .sl-completed-toggle-label {
    flex: 1;
  }

  /* ─── Add row (input + button) ────────────────────────────────── */
  .sl-add-row {
    display: flex;
    gap: var(--shopping-list-add-row-gap);
    align-items: center;
    margin: var(--shopping-list-add-row-margin);
  }

  .sl-input {
    flex: 1;
    min-width: 0;
    background: var(--shopping-list-input-bg);
    color: var(--shopping-list-input-fg);
    border: var(--shopping-list-input-border);
    border-radius: var(--shopping-list-input-radius);
    padding: var(--shopping-list-input-padding);
    font: inherit;
    font-size: var(--shopping-list-input-font-size);
    outline: none;
    transition:
      background 120ms ease,
      border-color 120ms ease;
  }
  .sl-input:focus {
    background: var(--shopping-list-input-bg-focus);
    border: var(--shopping-list-input-border-focus);
  }
  .sl-input::placeholder {
    color: var(--shopping-list-input-placeholder);
  }

  .sl-add-button {
    background: var(--shopping-list-button-bg);
    color: var(--shopping-list-button-fg);
    border: none;
    border-radius: var(--shopping-list-button-radius);
    padding: var(--shopping-list-button-padding);
    font: inherit;
    font-size: var(--shopping-list-button-font-size);
    font-weight: var(--shopping-list-button-font-weight);
    cursor: pointer;
    transition:
      filter 120ms ease,
      transform 80ms ease,
      opacity 120ms ease;
  }
  .sl-add-button:hover:not(:disabled) {
    filter: brightness(1.1);
  }
  .sl-add-button:active:not(:disabled) {
    transform: scale(0.97);
  }
  .sl-add-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

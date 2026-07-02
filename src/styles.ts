import { css } from "lit";

export const cardStyles = css`
  :host {
    --shopping-list-pill-bg: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    --shopping-list-pill-bg-hover: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    --shopping-list-pill-border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);

    --shopping-list-bg: var(--ha-card-background, var(--card-background-color, white));
    --shopping-list-fg: var(--primary-text-color, #212121);
    --shopping-list-muted: var(--secondary-text-color, #727272);
    --shopping-list-accent: var(--primary-color, #03a9f4);
    --shopping-list-error: var(--error-color, #db4437);
    --shopping-list-radius: 20px;
    --shopping-list-padding: 16px;
    --shopping-list-gap: 4px;

    --shopping-list-inner-radius: 14px;

    --shopping-list-header-gap: 10px;
    --shopping-list-header-padding: 4px 8px 8px;
    --shopping-list-header-icon-size: 22px;
    --shopping-list-header-icon-color: currentColor;
    --shopping-list-header-font-size: 1.1rem;
    --shopping-list-header-font-weight: 500;

    --shopping-list-item-bg: var(--shopping-list-pill-bg);
    --shopping-list-item-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-item-radius: var(--shopping-list-inner-radius);
    --shopping-list-item-padding: 8px 12px;
    --shopping-list-item-gap: 12px;
    --shopping-list-list-gap: 4px;

    --shopping-list-actions-gap: 0px;
    --shopping-list-action-size: 28px;
    --shopping-list-action-icon-size: 16px;
    --shopping-list-action-margin: -4px 0;

    --shopping-list-quantity-badge-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.14);
    --shopping-list-quantity-badge-fg: var(--shopping-list-accent);
    --shopping-list-quantity-badge-padding: 1px 8px;
    --shopping-list-quantity-badge-radius: 999px;
    --shopping-list-quantity-badge-font-size: 0.85em;
    --shopping-list-quantity-badge-font-weight: 600;
    --shopping-list-quantity-badge-margin: 0 0 0 6px;

    --shopping-list-quantity-stepper-gap: 2px;
    --shopping-list-quantity-step-size: 28px;
    --shopping-list-quantity-step-icon-size: 16px;
    --shopping-list-quantity-step-bg: var(--shopping-list-pill-bg);
    --shopping-list-quantity-step-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-quantity-step-fg: var(--shopping-list-fg);
    --shopping-list-quantity-step-radius: 999px;
    --shopping-list-quantity-value-min-width: 22px;

    --shopping-list-completed-fg: var(--disabled-text-color, #bdbdbd);
    --shopping-list-completed-decoration: line-through;

    --shopping-list-completed-toggle-bg: transparent;
    --shopping-list-completed-toggle-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-completed-toggle-fg: var(--shopping-list-muted);
    --shopping-list-completed-toggle-padding: 6px 10px;
    --shopping-list-completed-toggle-radius: var(--shopping-list-inner-radius);
    --shopping-list-completed-toggle-font-size: 0.85rem;
    --shopping-list-completed-toggle-font-weight: 500;
    --shopping-list-completed-toggle-icon-size: 18px;
    --shopping-list-completed-toggle-margin: 6px 0 0;

    --shopping-list-input-bg: var(--shopping-list-pill-bg);
    --shopping-list-input-bg-focus: var(--shopping-list-pill-bg-hover);
    --shopping-list-input-fg: var(--shopping-list-fg);
    --shopping-list-input-placeholder: var(--shopping-list-muted);
    --shopping-list-input-border: var(--shopping-list-pill-border);
    --shopping-list-input-border-focus: 1px solid var(--shopping-list-accent);
    --shopping-list-input-radius: var(--shopping-list-inner-radius);
    --shopping-list-input-padding: 10px 14px;
    --shopping-list-input-font-size: 0.95rem;

    --shopping-list-button-bg: var(--shopping-list-accent);
    --shopping-list-button-fg: var(--text-primary-color, white);
    --shopping-list-button-radius: var(--shopping-list-inner-radius);
    --shopping-list-button-padding: 10px 16px;
    --shopping-list-button-font-size: 0.95rem;
    --shopping-list-button-font-weight: 500;

    --shopping-list-empty-fg: var(--shopping-list-muted);
    --shopping-list-empty-padding: 16px 8px;

    --shopping-list-category-color: currentColor;

    --shopping-list-category-gap: 12px;
    --shopping-list-category-bg: transparent;
    --shopping-list-category-radius: var(--shopping-list-inner-radius);
    --shopping-list-category-padding: 0;

    --shopping-list-category-header-padding: 4px 4px 4px 0;
    --shopping-list-category-header-gap: 6px;
    --shopping-list-category-header-font-size: 0.95rem;
    --shopping-list-category-header-font-weight: 600;
    --shopping-list-category-header-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-category-count-color: var(--shopping-list-muted);
    --shopping-list-category-count-font-weight: 500;
    --shopping-list-category-count-margin: 0 0 0 6px;
    --shopping-list-category-collapse-size: 28px;
    --shopping-list-category-collapse-icon-size: 18px;
    --shopping-list-category-items-gap: var(--shopping-list-list-gap);
    --shopping-list-category-items-padding: 0 0 0 4px;

    --shopping-list-category-prefix-margin: 0 6px 0 0;
    --shopping-list-category-prefix-font-weight: 600;
    --shopping-list-category-prefix-opacity: 0.85;

    --shopping-list-add-row-gap: 8px;
    --shopping-list-add-row-spacing: 8px;

    --shopping-list-drag-handle-size: 24px;
    --shopping-list-drag-handle-icon-size: 18px;
    --shopping-list-drag-handle-color: var(--shopping-list-muted);
    --shopping-list-drag-handle-active-color: var(--shopping-list-accent);
    --shopping-list-drag-over-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    --shopping-list-drag-over-border-color: var(--shopping-list-accent);

    --shopping-list-offline-bg: rgba(var(--rgb-error-color, 219, 68, 55), 0.1);
    --shopping-list-offline-fg: var(--shopping-list-error);
    --shopping-list-offline-padding: 6px 12px;
    --shopping-list-offline-font-size: 0.85rem;

    display: block;
    height: var(--shopping-list-host-height, auto);
  }

  .sl-card {
    background: var(--shopping-list-bg);
    color: var(--shopping-list-fg);
    border-radius: var(--shopping-list-radius);
    padding: var(--shopping-list-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-gap);
    height: var(--shopping-list-card-height, auto);
    max-height: var(--shopping-list-card-max-height, none);
    box-sizing: border-box;
    overflow: hidden;
  }
  .sl-card--fill-screen {
    height: 100%;
    max-height: 100%;
  }

  .sl-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-header-gap);
    padding: var(--shopping-list-header-padding);
    font-size: var(--shopping-list-header-font-size);
    font-weight: var(--shopping-list-header-font-weight);
    flex-shrink: 0;
  }

  .sl-icon {
    --mdc-icon-size: var(--shopping-list-header-icon-size);
    color: var(--shopping-list-header-icon-color);
  }

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
    flex-shrink: 0;
  }

  .sl-offline {
    color: var(--shopping-list-offline-fg);
    background: var(--shopping-list-offline-bg);
    border-radius: var(--shopping-list-inner-radius);
    padding: var(--shopping-list-offline-padding);
    font-size: var(--shopping-list-offline-font-size);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .sl-list-scroll {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    -webkit-overflow-scrolling: touch;
  }
  .sl-list-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .sl-list-scroll::-webkit-scrollbar-thumb {
    background: var(--shopping-list-pill-bg-hover);
    border-radius: 2px;
  }

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
  .sl-item--no-row-click {
    cursor: default;
  }
  .sl-item--no-row-click:active {
    transform: none;
  }

  .sl-item--dragging {
    opacity: 0.5;
  }
  .sl-item--drag-over {
    background: var(--shopping-list-drag-over-bg);
    border-radius: var(--shopping-list-item-radius);
  }

  .sl-item--completed .sl-summary {
    color: var(--shopping-list-completed-fg);
    text-decoration: var(--shopping-list-completed-decoration);
  }

  .sl-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -8px;
    flex-shrink: 0;
  }

  .sl-summary {
    flex: 1;
    word-break: break-word;
    min-width: 0;
  }

  .sl-drag-handle {
    width: var(--shopping-list-drag-handle-size);
    height: var(--shopping-list-drag-handle-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--shopping-list-drag-handle-color);
    cursor: grab;
    --mdc-icon-size: var(--shopping-list-drag-handle-icon-size);
    border-radius: 4px;
    transition: color 120ms ease;
  }
  .sl-drag-handle:hover {
    color: var(--shopping-list-drag-handle-active-color);
  }
  .sl-drag-handle:active {
    cursor: grabbing;
    color: var(--shopping-list-drag-handle-active-color);
  }

  .sl-actions {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-actions-gap);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 120ms ease;
  }
  .sl-item:hover .sl-actions,
  .sl-item:focus-within .sl-actions,
  .sl-item--editing .sl-actions {
    opacity: 1;
  }
  @media (hover: none) {
    .sl-actions {
      opacity: 1;
    }
  }

  .sl-action-button {
    --ha-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-size: var(--shopping-list-action-icon-size);
    color: var(--shopping-list-muted);
    margin: var(--shopping-list-action-margin);
  }
  .sl-action-button-save {
    color: var(--shopping-list-accent);
  }

  .sl-edit-input {
    flex: 1;
    min-width: 0;
    background: transparent;
    color: var(--shopping-list-fg);
    border: none;
    border-bottom: 1px solid var(--shopping-list-accent);
    font: inherit;
    outline: none;
    padding: 2px 0;
  }
  .sl-edit-input::selection {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.35);
  }

  .sl-quantity-badge {
    display: inline-block;
    margin: var(--shopping-list-quantity-badge-margin);
    padding: var(--shopping-list-quantity-badge-padding);
    background: var(--shopping-list-quantity-badge-bg);
    color: var(--shopping-list-quantity-badge-fg);
    border-radius: var(--shopping-list-quantity-badge-radius);
    font-size: var(--shopping-list-quantity-badge-font-size);
    font-weight: var(--shopping-list-quantity-badge-font-weight);
    vertical-align: middle;
    white-space: nowrap;
  }
  .sl-item--completed .sl-quantity-badge {
    color: var(--shopping-list-completed-fg);
    background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);
  }

  .sl-quantity-stepper {
    display: inline-flex;
    align-items: center;
    gap: var(--shopping-list-quantity-stepper-gap);
    flex-shrink: 0;
  }
  .sl-quantity-step {
    width: var(--shopping-list-quantity-step-size);
    height: var(--shopping-list-quantity-step-size);
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--shopping-list-quantity-step-bg);
    color: var(--shopping-list-quantity-step-fg);
    border: none;
    border-radius: var(--shopping-list-quantity-step-radius);
    cursor: pointer;
    line-height: 1;
    transition: background 120ms ease;
    --mdc-icon-size: var(--shopping-list-quantity-step-icon-size);
  }
  .sl-quantity-step:hover:not(:disabled) {
    background: var(--shopping-list-quantity-step-bg-hover);
  }
  .sl-quantity-step:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .sl-quantity-value {
    min-width: var(--shopping-list-quantity-value-min-width);
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    color: var(--shopping-list-fg);
  }

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

  .sl-list--grouped {
    gap: var(--shopping-list-category-gap);
  }

  .sl-category {
    display: block;
    background: var(--shopping-list-category-bg);
    border-radius: var(--shopping-list-category-radius);
    padding: var(--shopping-list-category-padding);
  }

  .sl-category-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-category-header-gap);
    padding: var(--shopping-list-category-header-padding);
    font-size: var(--shopping-list-category-header-font-size);
    font-weight: var(--shopping-list-category-header-font-weight);
  }

  .sl-category-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -4px;
    flex-shrink: 0;
  }

  .sl-category-name {
    flex: 1;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--shopping-list-category-color);
    font: inherit;
    font-weight: var(--shopping-list-category-header-font-weight);
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
  }
  .sl-category-name:disabled {
    cursor: default;
  }
  .sl-category-name:hover:not(:disabled) {
    background: var(--shopping-list-category-header-bg-hover);
  }

  .sl-category-count {
    color: var(--shopping-list-category-count-color);
    font-weight: var(--shopping-list-category-count-font-weight);
    margin: var(--shopping-list-category-count-margin);
  }

  .sl-category-collapse {
    width: var(--shopping-list-category-collapse-size);
    height: var(--shopping-list-category-collapse-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--shopping-list-muted);
    border-radius: 999px;
    cursor: pointer;
    --mdc-icon-size: var(--shopping-list-category-collapse-icon-size);
    transition: background 120ms ease;
    flex-shrink: 0;
  }
  .sl-category-collapse:hover,
  .sl-category-collapse:focus-visible {
    background: var(--shopping-list-pill-bg-hover);
    outline: none;
  }

  .sl-category-items {
    list-style: none;
    margin: 0;
    padding: var(--shopping-list-category-items-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-category-items-gap);
  }

  .sl-grouped-completed {
    margin: 0;
    padding: 0;
  }

  .sl-category-prefix {
    color: var(--shopping-list-category-color);
    font-weight: var(--shopping-list-category-prefix-font-weight);
    opacity: var(--shopping-list-category-prefix-opacity);
    margin: var(--shopping-list-category-prefix-margin);
  }
  .sl-item--completed .sl-category-prefix {
    color: var(--shopping-list-completed-fg);
  }

  .sl-add-row {
    display: flex;
    gap: var(--shopping-list-add-row-gap);
    align-items: center;
    flex-shrink: 0;
  }
  .sl-add-row--bottom {
    margin-top: var(--shopping-list-add-row-spacing);
  }
  .sl-add-row--top {
    margin-bottom: var(--shopping-list-add-row-spacing);
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

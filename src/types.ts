import type { LovelaceCardConfig } from "./ha-types.js";

export type SortMode = "manual" | "alpha" | "created";

/**
 * How completed items are presented:
 *   - "bottom":   render at the end of the list (default)
 *   - "inline":   mixed with active items in HA's order
 *   - "collapse": show a "Completed (N)" toggle that expands the list
 *   - "hide":     don't render completed items at all
 */
export type CompletedDisplay = "bottom" | "inline" | "collapse" | "hide";

/**
 * Where the "add item" input row is rendered:
 *   - "bottom": below the list (default)
 *   - "top":    just under the header, above the list
 */
export type AddInputPosition = "bottom" | "top";

export interface ShoppingListCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  title?: string;
  icon?: string;
  show_header?: boolean;
  /** How to render completed items. Replaces the legacy `show_completed` boolean. */
  completed?: CompletedDisplay;
  /**
   * @deprecated Use `completed` instead. Kept for backwards-compat with
   * configs saved before the enum existed; auto-migrated in `setConfig`.
   */
  show_completed?: boolean;
  /** Label for the collapsed completed-items toggle in `completed: "collapse"` mode. */
  completed_label?: string;
  show_add_input?: boolean;
  /** Where to render the "add item" input row. Defaults to "bottom". */
  add_input_position?: AddInputPosition;
  add_button_label?: string;
  /** Allow inline renaming of items via a pencil button. Defaults to true. */
  enable_edit?: boolean;
  /** Allow removing items via the trailing close button. Defaults to true. */
  enable_remove?: boolean;
  /**
   * When true (default), clicking anywhere on an item row toggles its
   * checked state. When false, only the checkbox itself reacts to clicks
   * and the rest of the row is inert (no pointer cursor, no press
   * animation) — useful when you want clicks on the row to leave the
   * action buttons accessible without accidentally checking the item.
   */
  click_to_check?: boolean;
  /**
   * Track per-item quantities. When enabled, edits expose a `−/N/+`
   * stepper and items render as `name ×N` (badge shown only when N > 1).
   * Quantity is persisted in the item's summary as `<quantity: N>`.
   * Defaults to false.
   */
  enable_quantity?: boolean;
  /**
   * Maximum allowed quantity. `0` (the default) means unlimited.
   * The stepper's `+` button is disabled when the current value reaches
   * this limit; existing items above the limit are not auto-clamped.
   */
  quantity_max?: number;
  /**
   * Parse `[Category] Name` prefixes out of item summaries. When off,
   * the brackets are just text and the rest of the category options
   * have no effect. Defaults to false.
   */
  enable_categories?: boolean;
  /**
   * When categories are enabled, group items under collapsible category
   * headers (`true`, default) or render a flat list with the category
   * prefix shown on each item (`false`).
   */
  group_by_category?: boolean;
  /** Show the chevron toggle on each category header. Defaults to true. */
  category_collapsible?: boolean;
  /**
   * Show a "check all" checkbox on each category header. Clicking it
   * marks every item in the category complete (or active if all already
   * complete). Defaults to true.
   */
  category_check_all?: boolean;
  /**
   * Show an `(N)` badge on each category header counting items still to
   * be checked off. The badge is hidden automatically when the category
   * has no remaining active items. Defaults to true.
   */
  category_show_count?: boolean;
  /** Label for the bucket of items with no `[Category]` prefix. */
  general_category_label?: string;
  /**
   * Map of category name → CSS color, applied to category labels in
   * both grouped and flat layouts. Any valid CSS `<color>` works.
   */
  category_colors?: Record<string, string>;
  empty_message?: string;
  sort?: SortMode;
  /** Free-form CSS appended to the card's shadow root for power users / theming. */
  card_mod?: { style?: string } | string;
  /** Direct style overrides without card-mod. Same idea, simpler. */
  style?: string;
}

/**
 * Shape of an item returned by the `todo/item/list` WebSocket call.
 * See: https://www.home-assistant.io/integrations/todo/
 */
export interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  description?: string;
  due?: string;
}

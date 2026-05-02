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
  add_button_label?: string;
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

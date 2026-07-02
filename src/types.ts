import type { LovelaceCardConfig } from "./ha-types.js";

export type SortMode = "manual" | "alpha" | "created";

export type CompletedDisplay = "bottom" | "inline" | "collapse" | "hide";

export type AddInputPosition = "bottom" | "top";

export interface ShoppingListCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  title?: string;
  icon?: string;
  show_header?: boolean;
  completed?: CompletedDisplay;
  show_completed?: boolean;
  completed_label?: string;
  show_add_input?: boolean;
  add_input_position?: AddInputPosition;
  add_button_label?: string;
  enable_edit?: boolean;
  enable_remove?: boolean;
  click_to_check?: boolean;
  enable_quantity?: boolean;
  quantity_max?: number;
  enable_categories?: boolean;
  group_by_category?: boolean;
  category_collapsible?: boolean;
  category_check_all?: boolean;
  category_show_count?: boolean;
  general_category_label?: string;
  category_colors?: Record<string, string>;
  empty_message?: string;
  sort?: SortMode;
  card_mod?: { style?: string } | string;
  style?: string;
  fill_screen?: boolean;
  enable_reorder?: boolean;
}

export interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  description?: string;
  due?: string;
}

export interface PendingOperation {
  domain: string;
  service: string;
  serviceData: Record<string, unknown>;
}

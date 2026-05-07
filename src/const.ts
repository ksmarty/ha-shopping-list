export const CARD_VERSION = "0.1.0";

export const CARD_TAG = "shopping-list-card";
export const EDITOR_TAG = "shopping-list-card-editor";

export const DEFAULT_CONFIG = {
  type: `custom:${CARD_TAG}`,
  title: "Shopping List",
  show_header: true,
  completed: "bottom" as const,
  completed_label: "Completed",
  show_add_input: true,
  add_input_position: "bottom" as const,
  add_button_label: "Add",
  enable_edit: true,
  enable_remove: true,
  click_to_check: true,
  enable_quantity: false,
  quantity_max: 0,
  empty_message: "Nothing on the list",
  sort: "manual" as const,
};

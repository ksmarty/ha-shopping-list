# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-08

First public release. A custom dashboard card that turns any Home Assistant
`todo` entity into a shopping-style list, with categories, quantities, and a
fully themeable UI — all configurable from the visual editor.

### Added

- **List view** — render any `todo.<name>` entity as a checkable list. Real-time
  updates via the `todo/item/subscribe` WebSocket subscription.
- **Inline add / edit / remove** — type to add, hover (always visible on touch)
  to edit or delete an item. Each action is a separately toggleable feature
  (`enable_edit`, `enable_remove`, `show_add_input`).
- **Quantities** (opt-in via `enable_quantity`) — `−/N/+` stepper on both the
  add row and during inline edit. Max cap configurable via `quantity_max`
  (`0` = unlimited). Stored unobtrusively as `<quantity: N>` in the item
  summary so other clients still see a readable name.
- **Categories** (opt-in via `enable_categories`) — prefix items with
  `[Category]` to bucket them. Includes:
  - `group_by_category` — grouped (collapsible per-category sections) vs.
    flat (`[Category]` shown inline on each row).
  - `category_collapsible` — chevron to expand/collapse each group.
  - `category_check_all` — header checkbox to toggle every item in a group.
  - `category_show_count` — `(N)` badge counting active items per category.
  - `general_category_label` — bucket label for items with no `[Category]`
    prefix.
  - `category_colors` — YAML map of category name → CSS color, applied to the
    bracket label. Defaults to `General: grey`, `Veggies: green` until
    overridden.
- **Completed-items modes** — `bottom` (default), `inline`, `collapse` (a
  collapsible "Completed (N)" section, lifted to a single global group when
  combined with categories), or `hide`.
- **Sorting** — `manual` (HA's order), `alpha`, or `created`. Applies inside
  groups when categories are on.
- **Add-bar position** — `bottom` (default) or `top` (under the header).
- **Click-to-check toggle** — `click_to_check` controls whether tapping the
  whole row toggles the checkbox or only the checkbox itself does.
- **Theme-aware styling** — every color and dimension is a CSS custom property
  routed through HA's `--rgb-*` variables, so light / dark themes work
  out of the box.
- **Customization slots** — drop-in custom CSS via `style:` or `card_mod:`,
  plus a YAML editor for category colors. All `.sl-*` class names are stable;
  per-item action buttons carry both a base `sl-action-button` class and a
  variant class (`sl-action-button-edit`, `sl-action-button-delete`,
  `sl-action-button-save`, `sl-action-button-cancel`).
- **Visual editor** — collapsible sections for Header, To-do items, Quantities,
  Completed items, Add items, Categories, Customization. Defaults are merged
  for display, diff-based persistence keeps saved YAML clean.
- **Local development harness** under `dev/` — mocked `hass`, stubbed `ha-*`
  components, light/dark + desktop/mobile toggles, and feature presets. Runs
  on `npm run dev` at `http://localhost:5173/dev/`, no Home Assistant
  required.
- **CI/CD** — GitHub Actions for typecheck + format + build on every push, and
  a release workflow that attaches the built bundle to GitHub Releases for
  HACS to consume.
- **Git hooks** — `simple-git-hooks` with `pre-commit` (typecheck + format
  check) and `pre-push` (rebuild + verify `dist/` matches source).

[Unreleased]: https://github.com/MCuello17/ha-shopping-list/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MCuello17/ha-shopping-list/releases/tag/v0.1.0

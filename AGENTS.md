# AGENTS.md — Shopping List Card

## Project Overview

A Home Assistant Lovelace custom card for todo entities (shopping lists). Built with Lit, TypeScript, and Vite.

### Key Files

| File | Purpose |
|------|---------|
| `src/shopping-list-card.ts` | Main card component — renders the list, handles all user interactions |
| `src/shopping-list-card-editor.ts` | Visual editor for the card's config |
| `src/types.ts` | TypeScript interfaces for config, items, and pending operations |
| `src/const.ts` | Constants: card tag, version, default config |
| `src/styles.ts` | All CSS with `--shopping-list-*` custom property theming |
| `src/ha-types.ts` | Minimal HA type stubs (HomeAssistant, LovelaceCard, etc.) |
| `src/categories.ts` | `[Category]` prefix parsing and category color YAML helpers |
| `src/quantity.ts` | `<quantity: N>` marker parsing/formatting |
| `vite.config.ts` | Vite build config (library mode → single ESM output) |
| `dev/index.html` | Dev harness with mock HA, presets, theme/device toggles |
| `dev/mock-hass.js` | In-memory mock of HA's WebSocket and service APIs |
| `dev/ha-stubs.js` | Stub web components for ha-card, ha-icon, ha-checkbox, etc. |

## Architecture

### Component Structure

- `ShoppingListCard` (`shopping-list-card`) — main card element
- `ShoppingListCardEditor` (`shopping-list-card-editor`) — config editor
- Both extend `LitElement` and implement HA's `LovelaceCard` / `LovelaceCardEditor` interfaces

### Data Flow

1. `setConfig(config)` — stores config, loads saved item order from localStorage
2. `updated()` — on entity change, subscribes to HA todo WS API and sets up connection monitoring
3. `_setupSubscription(entity)` — fetches initial items, subscribes to `todo/item/subscribe` for real-time updates
4. WS subscription callback updates `_items` state → Lit re-renders
5. User actions (add/toggle/remove/edit) call HA services via `_executeService()`
6. `_executeService()` handles offline queuing automatically

### State Management

- `@state()` decorated fields trigger Lit re-renders
- `_items: TodoItem[]` — main data source from HA
- `_offlineQueue: PendingOperation[]` — queued service calls when offline
- `_itemOrder: string[]` — saved drag-reorder order (localStorage persisted)
- `_connected: boolean` — tracked via HA connection events + window online/offline
- `_collapsedCategories: Set<string>` — per-category collapse state

## Features Implemented

### Offline Support

- Monitors HA WebSocket connection state via `connection.addEventListener('ready'/'disconnected')`
- Falls back to `window.addEventListener('online'/'offline')`
- When offline: queues service calls, applies changes optimistically to `_items`
- When reconnected: flushes queue sequentially, re-fetches items from HA
- Shows visual "Offline — N pending changes" banner

### Drag-and-Drop Reorder

- Uses native HTML5 Drag & Drop API (no external dependency)
- Drag handle (`mdi:drag`) shown on active items in manual sort mode
- Order persisted to `localStorage` keyed by `shopping_list_order_{entity_id}`
- Only applies when `sort: "manual"` (default) and `enable_reorder: true`

### Fill Screen

- Config option `fill_screen: true` makes card take full available height
- Card gets `height: 100%; max-height: 100%` with `box-sizing: border-box`
- Scroll wrapper uses `flex: 1; overflow-y: auto; min-height: 0` to fill space
- Header, error, offline banner, and add-row are `flex-shrink: 0`

### Scrollable List

- Items rendered inside `div.sl-list-scroll` with `overflow-y: auto`
- Custom thin scrollbar styling via `::-webkit-scrollbar`
- Touch scrolling enabled with `-webkit-overflow-scrolling: touch`

### Categories

- Items prefixed with `[Category]` are grouped under collapsible headers
- `group_by_category` toggles between grouped and flat-with-prefix layouts
- Per-category colors via `category_colors` config or YAML editor
- Check-all checkbox per category header
- Global completed section in collapse mode lifts completed items out of groups

### Quantities

- Optional `<quantity: N>` marker encoded in item summary text
- Stepper shown in add-row and edit mode
- Quantity cap via `quantity_max` (0 = unlimited)

### Inline Edit

- Pencil button to enter edit mode on any item
- Edit inline with Enter to save, Escape to cancel
- Auto-commits on blur (with mousedown suppression on action buttons)

## Config Options

See README.md for full reference. Key options:

- `entity` (required) — todo entity
- `fill_screen` — fill available height
- `sort` — manual / alpha / created
- `enable_reorder` — drag-and-drop reorder toggle
- `completed` — bottom / inline / collapse / hide
- `enable_quantity` — quantity tracking
- `enable_categories` — `[Category]` prefix grouping
- `click_to_check` — click row to toggle

## Build System

### Vite (replaced Rollup)

- Library mode produces a single ESM file: `dist/ha-shopping-list-card.js`
- Config in `vite.config.ts`
- Dev: `pnpm dev` starts Vite dev server on port 5173
- Build: `pnpm build` runs `vite build`
- Typecheck: `pnpm typecheck` runs `tsc --noEmit`
- Format: `pnpm format` runs `prettier --write`

### Dev Harness

- `dev/index.html` with mock HA environment
- Presets for every feature combination
- Theme toggle (dark/light) and device toggle (desktop/mobile)
- Seed buttons for test data
- Online/Offline toggle for testing offline mode

## CSS Architecture

- Every visual property is a `--shopping-list-*` CSS custom property
- All colors use `rgba(var(--rgb-primary-text-color), α)` for automatic dark/light mode support
- `.sl-*` class namespace for user customization via `style:` config
- No hard-coded colors or dimensions

## Editor Schema

- Uses HA's `<ha-form>` with collapsible expandable groups
- Custom `<details>` elements for Categories and Customization sections
- Category colors use `<ha-code-editor>` with a line-oriented YAML parser
- Custom CSS via code editor in the Customization section
- All editor changes fire `config-changed` events for live preview

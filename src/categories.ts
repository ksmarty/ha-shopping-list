/**
 * Category is a plain-text prefix at the start of an item's summary,
 * wrapped in square brackets:
 *
 *     [Veggies] Lettuce <quantity: 2>
 *
 * The user types the brackets manually — there's no UI affordance to add
 * them, by design. An item with no leading `[Category]` belongs to the
 * "General" bucket and its summary stays untouched.
 *
 * This module owns the prefix parsing only. The quantity marker that may
 * follow the name is parsed independently by `./quantity.ts`.
 */

const PREFIX_RE = /^\s*\[([^\]]+)\]\s*/;

export interface ParsedCategory {
  /** The category name with surrounding whitespace trimmed, or `null`. */
  category: string | null;
  /** What's left of the summary after the prefix has been stripped. */
  rest: string;
}

export function parseCategory(summary: string): ParsedCategory {
  const match = summary.match(PREFIX_RE);
  if (!match) return { category: null, rest: summary };
  const category = match[1].trim();
  const rest = summary.slice(match[0].length);
  // `[]` and `[   ]` are treated as "no category" so we don't end up
  // grouping a bunch of items under an empty-string bucket.
  if (!category) return { category: null, rest };
  return { category, rest };
}

/**
 * Inverse of `parseCategory`. Re-prepends the category prefix to a
 * summary body. We don't normalize the user's bracket spacing — they get
 * the canonical "[Cat] body" form back so saved YAML stays consistent.
 */
export function formatCategory(category: string | null, rest: string): string {
  const body = rest.trim();
  if (!category) return body;
  return `[${category.trim()}] ${body}`;
}

/* ──────────────────────────────────────────────────────────────────────
 * Category-color YAML helpers.
 *
 * Parses a small, line-oriented dialect — strict enough to be robust
 * without pulling in a YAML library:
 *
 *     Veggies: green
 *     Dairy: "#171717"
 *     # comments allowed at start of line
 *     - Frozen: rgb(100, 200, 255)   # leading "- " tolerated
 *
 * Out: { Veggies: "green", Dairy: "#171717", Frozen: "rgb(100, 200, 255)" }
 *
 * Values are passed through verbatim to CSS as the value of the
 * `--shopping-list-category-color` custom property, so any valid CSS
 * <color> works (named, hex, rgb(), hsl(), var(...), etc.).
 * ────────────────────────────────────────────────────────────────────── */

export function parseCategoryColors(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!text) return result;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("#")) continue; // pure comment line
    // Tolerate the user-friendly "- key: value" list-item style.
    const cleaned = line.replace(/^-\s*/, "");
    const colonIdx = cleaned.indexOf(":");
    if (colonIdx <= 0) continue;
    const key = cleaned.slice(0, colonIdx).trim();
    let value = cleaned.slice(colonIdx + 1).trim();
    // Strip optional surrounding quotes (so the user can write
    // `Dairy: "#171717"` to placate strict YAML linters).
    value = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    if (key && value) result[key] = value;
  }
  return result;
}

export function stringifyCategoryColors(colors: Record<string, string> | undefined): string {
  if (!colors) return "";
  return Object.entries(colors)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

/**
 * Implicit color defaults applied when the user hasn't set
 * `category_colors` at all. Both keyed by the literal label that the
 * group header displays, including the default General-bucket label.
 *
 * Treatment of "set to empty" vs "never set":
 *   - `category_colors: undefined` → these defaults apply
 *   - `category_colors: {}`         → user explicitly cleared, no defaults
 *   - `category_colors: { ... }`    → use exactly what's there, no merge
 *
 * No merging on purpose: a user who deletes the General entry should see
 * the General label revert to currentColor, not have grey re-injected.
 */
export const DEFAULT_CATEGORY_COLORS: Readonly<Record<string, string>> = Object.freeze({
  General: "grey",
  Veggies: "green",
});

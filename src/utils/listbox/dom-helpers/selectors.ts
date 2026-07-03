/**
 * CSS selector for listbox container elements, for use with `Element.closest()`.
 * Covers all container roles supported by the listbox utility.
 */
export const LISTBOX_CONTAINER_SELECTOR = '[role="listbox"], [role="tree"]'

/**
 * CSS selector matching any option role, for use with `Element.closest()`.
 * Tag-agnostic so it matches option elements regardless of their tag name (e.g. button, div, summary).
 */
export const OPTION_ROLE_SELECTOR = '[role="option"], [role="treeitem"]'

/**
 * CSS selector for all listbox/tree option elements.
 *
 * Matches:
 * - `button[role="option"]` — standard listbox option buttons
 * - `button[role="treeitem"]` — tree widget leaf items
 * - `summary[role="treeitem"]` — tree group headers (expand/collapse via native <details>)
 */
export const OPTION_SELECTOR = ':is(button[role="option"], button[role="treeitem"], summary[role="treeitem"])'

/**
 * CSS selector for selected listbox option elements.
 *
 * Matches button elements with role="option" that are currently selected,
 * as indicated by either aria-checked="true" or aria-selected="true".
 *
 * The selector checks both attributes because:
 * - Single-select listboxes use `aria-selected="true"` to indicate selection
 * - Multi-select listboxes use `aria-checked="true"` to indicate selection
 *
 * This follows the ARIA listbox pattern specification:
 * https://www.w3.org/WAI/ARIA/apg/patterns/listbox
 */
export const SELECTED_OPTION_SELECTOR = `${OPTION_SELECTOR}:is([aria-checked="true"], [aria-selected="true"])`

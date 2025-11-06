/**
 * CSS selector for all listbox option elements.
 *
 * Matches button elements with the role="option" attribute, which represent
 * individual options within a listbox. These are the interactive elements that
 * users can click or navigate to with the keyboard.
 */
export const OPTION_SELECTOR = 'button[role="option"]'

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

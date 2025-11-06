/**
 * Determines whether a listbox option is selected by checking its ARIA attributes.
 *
 * This function checks both `aria-checked` and `aria-selected` attributes because
 * the appropriate attribute depends on the listbox type:
 * - Single-select listboxes use `aria-selected="true"` to indicate selection
 * - Multi-select listboxes use `aria-checked="true"` to indicate selection
 *
 * See https://www.w3.org/WAI/ARIA/apg/patterns/listbox for ARIA listbox patterns.
 *
 * @param option - The button element representing a listbox option
 * @returns `true` if the option is selected (either checked or selected), `false` otherwise
 *
 * @example
 * // Check if a specific option is selected
 * const optionElement = document.querySelector('[role="option"][value="option1"]')
 * if (isListboxOptionSelected(optionElement)) {
 *   console.log('Option 1 is selected')
 * }
 *
 * @example
 * // Filter to only selected options
 * const allOptions = Array.from(document.querySelectorAll('[role="option"]'))
 * const selectedOptions = allOptions.filter(isListboxOptionSelected)
 *
 * @example
 * // Check selection in a multi-select listbox (uses aria-checked)
 * const multiSelectOption = document.querySelector('[aria-checked="true"]')
 * console.log(isListboxOptionSelected(multiSelectOption)) // true
 *
 * @example
 * // Check selection in a single-select listbox (uses aria-selected)
 * const singleSelectOption = document.querySelector('[aria-selected="true"]')
 * console.log(isListboxOptionSelected(singleSelectOption)) // true
 */
export function isListboxOptionSelected(option: HTMLButtonElement): boolean {
  return option.ariaChecked === 'true' || option.ariaSelected === 'true'
}

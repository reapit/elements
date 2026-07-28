import { SELECTED_OPTION_SELECTOR } from "./selectors";

/**
 * Returns an array of the selected display options (button elements) from a listbox.
 *
 * This function queries the listbox DOM for all option elements that are currently marked as
 * selected using ARIA attributes (aria-checked="true" or aria-selected="true"). Unlike
 * `getListboxValue`, which returns the values themselves, this function returns the actual
 * DOM button elements representing the selected options.
 *
 * This is useful when you need to interact with the selected option elements directly,
 * such as for styling, scrolling into view, or extracting additional data attributes.
 *
 * @param listboxElement - The listbox element to search within
 * @returns An array of HTMLButtonElement instances representing the selected options
 *
 * @example
 * // Get selected option elements from a listbox
 * const listboxElement = document.getElementById('my-listbox')
 * const selectedOptions = getListboxSelectedOptions(listboxElement)
 * console.log(`${selectedOptions.length} options selected`)
 *
 * @example
 * // Scroll the first selected option into view
 * const selectedOptions = getListboxSelectedOptions(listboxElement)
 * if (selectedOptions.length > 0) {
 *   selectedOptions[0].scrollIntoView({ block: 'nearest' })
 * }
 *
 * @example
 * // Extract values from selected option buttons
 * const selectedOptions = getListboxSelectedOptions(listboxElement)
 * const values = selectedOptions.map(option => option.value)
 *
 * @example
 * // Apply styling to selected options
 * const selectedOptions = getListboxSelectedOptions(listboxElement)
 * selectedOptions.forEach(option => {
 *   option.classList.add('highlighted')
 * })
 */
export function getListboxSelectedOptions(listboxElement: HTMLElement): HTMLButtonElement[] {
  return Array.from(listboxElement.querySelectorAll(SELECTED_OPTION_SELECTOR)).filter(
    // Need to exclude options with an empty value.
    (option) => option instanceof HTMLButtonElement && option.value !== "",
  ) as HTMLButtonElement[];
}

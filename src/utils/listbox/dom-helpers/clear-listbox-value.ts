import { dispatchInputEvent, getListboxSelectElement } from './common'

/**
 * Clears all selected options in a listbox.
 *
 * Iterates through all selected options in the underlying select element and deselects them.
 * Dispatches an input event to notify listeners, but only when selected options exist.
 *
 * @param listboxId - Listbox element ID
 * @throws {ListboxError} when the listbox does not exist or lacks a select element
 *
 * @example
 * // Clear all selections in a listbox
 * clearListboxValue('my-listbox')
 *
 * @example
 * // Clear selections with error handling
 * try {
 *   clearListboxValue('my-listbox')
 * } catch (error) {
 *   if (error instanceof ListboxError) {
 *     console.error('Failed to clear listbox:', error.message)
 *   }
 * }
 */
export function clearListboxValue(listboxId: string): void {
  const selectElement = getListboxSelectElement(listboxId)
  const hadSelectedOptions = selectElement.selectedOptions.length > 0

  for (const option of Array.from(selectElement.selectedOptions)) {
    option.selected = false
  }

  // Dispatches an event only when options were deselected
  if (hadSelectedOptions) {
    dispatchInputEvent(selectElement)
  }
}

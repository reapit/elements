import { getListboxSelectElement } from './common'

/**
 * Gets selected values from a listbox.
 *
 * Retrieves all selected option values from the underlying select element. Filters out
 * empty string values (typically from placeholder options). Accepts either a listbox ID
 * or a direct reference to the select element.
 *
 * @param listboxId - Listbox element ID
 * @returns Readonly array of selected option values, excluding empty strings
 * @throws {ListboxError} when the listbox does not exist or lacks a select element
 */
export function getListboxValue(listboxId: string): string | readonly string[]
export function getListboxValue(selectElement: HTMLSelectElement): string | readonly string[]
export function getListboxValue(listboxIdOrSelectElement: string | HTMLSelectElement): string | readonly string[] {
  const selectElement =
    listboxIdOrSelectElement instanceof HTMLSelectElement
      ? listboxIdOrSelectElement
      : getListboxSelectElement(listboxIdOrSelectElement)

  const values = Array.from(selectElement.selectedOptions)
    .map((option) => option.value)
    .filter((value) => value !== '')

  if (selectElement.multiple) {
    return values
  }

  return values[0] ?? ''
}

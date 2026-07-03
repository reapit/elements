/**
 * Returns the search input element ID for the given combobox ID.
 * @param comboboxId - The combobox button element ID
 * @returns The search input element ID
 */
export function getComboboxSearchInputId(comboboxId: string): string {
  return `${comboboxId}-search-input`
}

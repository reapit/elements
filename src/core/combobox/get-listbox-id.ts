/**
 * Returns the listbox element ID for the given combobox ID.
 * @param comboboxId - The combobox button element ID
 * @returns The listbox element ID
 */
export function getComboboxListboxId(comboboxId: string): string {
  return `${comboboxId}-listbox`
}

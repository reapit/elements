/**
 * Returns the popup element ID for the given combobox ID.
 * @param comboboxId - The combobox button element ID
 * @returns The popup element ID
 */
export function getComboboxPopupId(comboboxId: string): string {
  return `${comboboxId}-popup`;
}

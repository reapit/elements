/**
 * Hides a combobox popup dialog.
 * @param elementOrId - The popup dialog element or its ID.
 * @throws When the function cannot find the element or when the element is not an HTMLDialogElement.
 */
export function closeComboboxPopup(elementOrId: HTMLDialogElement | string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId

  if (!element) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : '(passed by reference)'
    throw new Error(`closeComboboxPopup: Element ${identifier} not found in the DOM`)
  }

  if (!(element instanceof HTMLDialogElement)) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : '(passed by reference)'
    throw new Error(`closeComboboxPopup: Element ${identifier} is not an HTMLDialogElement`)
  }

  element.close()
}

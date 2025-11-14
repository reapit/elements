/**
 * Shows a combobox popup dialog as a modal.
 * @param elementOrId - The popup dialog element or its ID.
 * @throws if the element is not found in the DOM or is not an HTMLDialogElement.
 */
export function openComboboxPopup(elementOrId: HTMLDialogElement | string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId

  if (!element) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : 'provided'
    throw new Error(`openComboboxPopup: Element ${identifier} not found in the DOM`)
  }

  if (!(element instanceof HTMLDialogElement)) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : 'provided'
    throw new Error(`openComboboxPopup: Element ${identifier} is not an HTMLDialogElement`)
  }

  element.showModal()
}

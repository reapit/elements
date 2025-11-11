/**
 * Toggles a popup as a dialog modal or popover based on the element type.
 * @param elementOrId - The popup element or its ID.
 * @throws if the element is not found in the DOM.
 */
export function toggleComboboxPopup(elementOrId: HTMLElement | string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId

  if (!element) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : 'provided'
    throw new Error(`togglePopup: Element ${identifier} not found in the DOM`)
  }

  // Manually toggle dialog elements; toggle popover elements
  if (element instanceof HTMLDialogElement) {
    if (element.open) {
      element.close()
    } else {
      element.showModal()
    }
  } else if (element instanceof HTMLElement) {
    element.togglePopover()
  }
}

/**
 * Hides a popup as a dialog modal or popover based on the element type.
 * @param elementOrId - The popup element or its ID.
 * @throws if the element is not found in the DOM.
 */
export function hideComboboxPopup(elementOrId: HTMLElement | string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId

  if (!element) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : 'provided'
    throw new Error(`hidePopup: Element ${identifier} not found in the DOM`)
  }

  // Close dialog elements; hide popover elements
  if (element instanceof HTMLDialogElement) {
    element.close()
  } else if (element instanceof HTMLElement) {
    element.hidePopover()
  }
}

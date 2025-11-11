/**
 * Shows a popup as a dialog modal or popover based on the element type.
 * @param elementOrId - The popup element or its ID.
 * @throws if the element is not found in the DOM.
 */
export function showComboboxPopup(elementOrId: HTMLElement | string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId

  if (!element) {
    const identifier = typeof elementOrId === 'string' ? `with ID "${elementOrId}"` : 'provided'
    throw new Error(`showPopup: Element ${identifier} not found in the DOM`)
  }

  // Show dialog elements as modals; show other elements as popovers
  if (element instanceof HTMLDialogElement) {
    element.showModal()
  } else if (element instanceof HTMLElement) {
    element.showPopover()
  }
}

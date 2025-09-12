/**
 * Returns the closest ancestral dialog for the given element. Useful in event handlers
 * when needing to imperatively control the dialog from one of its descendants.
 */
export function getClosestDialogElement(element: HTMLElement): HTMLDialogElement | null {
  return element.closest('dialog')
}

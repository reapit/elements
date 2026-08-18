/**
 * Returns the closest ancestral dialog for the given element. Useful in event handlers
 * when needing to imperatively control the dialog from one of its descendants.
 * @param element - The element to search from.
 * @returns The closest ancestral dialog element, or null if none found.
 */
export function getClosestDialogElement(element: HTMLElement): HTMLDialogElement | null {
  return element.closest("dialog");
}

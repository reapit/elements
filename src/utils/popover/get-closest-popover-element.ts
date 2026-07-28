/**
 * Finds the closest popover ancestor. Use in event handlers to control the popover
 * from a descendant element.
 */
export function getClosestPopoverElement(element: HTMLElement): HTMLElement | null {
  return element.closest("[popover]");
}

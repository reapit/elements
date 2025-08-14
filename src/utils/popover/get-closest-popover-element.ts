/**
 * Returns the closest ancestor acting as a popover for the given element. Useful in event
 * handlers when needing to imperatively control the popover from one of its descendants.
 */
export function getClosestPopoverElement(element: HTMLElement): HTMLElement | null {
  return element.closest('[popover]')
}

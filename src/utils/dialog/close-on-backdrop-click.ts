import type { MouseEvent } from 'react'

/**
 * Closes the dialog when clicking on the backdrop (Safari workaround for closedby='any').
 *
 * Safari doesn't support the closedby='any' attribute, so we handle backdrop clicks manually.
 * This function checks whether the dialog has closedby='any' set and, if the browser doesn't
 * support closedBy natively, closes the dialog when the backdrop is clicked.
 *
 * The function does nothing when:
 * - The dialog doesn't have closedby='any' attribute
 * - The browser supports closedBy natively
 * - The click was on dialog content (not the backdrop)
 *
 * Safe to call unconditionally - it will only close the dialog when all conditions are met.
 *
 * @param event - The click event from the dialog element.
 *
 * @example
 * const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
 *   maybeCloseOnBackdropClick(event)
 * }
 */
export function maybeCloseOnBackdropClick(event: MouseEvent<HTMLDialogElement>): void {
  const dialog = event.currentTarget
  const hasClosedByAny = dialog.getAttribute('closedby') === 'any'

  // Only handle backdrop clicks for dialogs with closedby='any'
  if (!hasClosedByAny) {
    return
  }

  const isClosedBySupported = 'closedBy' in HTMLDialogElement.prototype

  if (!isClosedBySupported && event.target === event.currentTarget) {
    // Click was on the backdrop, not on dialog content
    dialog.close()
  }
}

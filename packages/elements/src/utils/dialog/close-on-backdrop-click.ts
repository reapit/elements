import type { MouseEvent } from "react";

/**
 * Closes the dialog when clicking on the backdrop, when `closedBy` is `'any'`.
 *
 * The native `closedby="any"` light-dismiss algorithm closes the dialog on `pointerup`,
 * before the resulting `click` event is dispatched. This means the dialog (and its
 * `::backdrop`) has already been removed from the top layer by the time `click` fires, so
 * the browser hit-tests the click against whatever is now exposed underneath - firing it
 * too. To avoid that, `HTMLDialog` renders the real `closedby` attribute as `'closerequest'`
 * whenever `consumeBackdropClick` is `true`, which disables native light-dismiss and leaves
 * this function as the sole mechanism for closing on backdrop click - the dialog stays open
 * throughout the gesture, so the click is correctly hit-tested against the dialog, not the
 * page underneath.
 *
 * When `consumeBackdropClick` is `false`, the real `closedby` attribute stays `'any'` and
 * native light-dismiss is left to run - except in browsers without `closedBy` support (e.g.
 * Safari), where that attribute does nothing. This function polyfills that case, closing the
 * dialog itself so backdrop clicks still dismiss it.
 *
 * The function does nothing when:
 * - `closedBy` is not `'any'`
 * - The click was on dialog content (not the backdrop)
 * - `consumeBackdropClick` is `false` and the browser supports `closedBy` natively (native
 *   light-dismiss is left to run instead)
 *
 * Safe to call unconditionally - it will only close the dialog when all conditions are met.
 *
 * @param event - The click event from the dialog element.
 * @param closedBy - The logical `closedBy` value ('any' | 'closerequest' | 'none').
 * @param consumeBackdropClick - Whether a backdrop click should be fully consumed by dismissal.
 *
 * @example
 * const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
 *   maybeCloseOnBackdropClick(event, closedBy, consumeBackdropClick)
 * }
 */
export function maybeCloseOnBackdropClick(
  event: MouseEvent<HTMLDialogElement>,
  closedBy: "any" | "closerequest" | "none",
  consumeBackdropClick: boolean,
): void {
  if (closedBy !== "any" || event.target !== event.currentTarget) {
    return;
  }

  const isClosedBySupported = "closedBy" in HTMLDialogElement.prototype;

  if (!consumeBackdropClick && isClosedBySupported) {
    return;
  }

  if (event.currentTarget.open) {
    event.currentTarget.close();
  }
}

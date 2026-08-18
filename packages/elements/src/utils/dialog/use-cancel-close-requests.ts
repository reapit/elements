import { useCallback } from "react";
import type { ReactEventHandler } from "react";

/**
 * Cancel any `cancel` events emitted by the browser when the dialog close request is made if `closedBy` is `none`.
 * This allows us to approximate the real `closedBy` attribute of the HTML dialog element.
 *
 * @param closedBy - The types of user actions that can close the dialog.
 * @param onCancel - Optional cancel event handler from consumer.
 * @returns A cancel event handler that stops propagation and optionally prevents default.
 */
export function useCancelCloseRequests(
  closedBy: "any" | "closerequest" | "none",
  onCancel?: ReactEventHandler<HTMLDialogElement>,
): ReactEventHandler<HTMLDialogElement> {
  return useCallback<ReactEventHandler<HTMLDialogElement>>(
    (event) => {
      // Native <dialog> cancel events do not bubble. React events do, so we prevent propagation to align
      // with native behaviour.
      event.stopPropagation();

      // When `closedBy` is "none", prevents the dialog from closing by cancelling the browser's cancel event.
      // This simulates the HTML `closedBy` attribute, which lacks broad browser support. With `closedBy`
      // set to "none", the drawer closes only through developer-specified mechanisms (e.g. a button
      // calling `HTMLDialogElement.close()`).
      //
      // Note: We can only cancel browser-emitted events. Some browsers emit only a close event when Esc
      // is pressed, not a cancel event. In these cases, the drawer will always close.
      if (closedBy === "none" && event.target === event.currentTarget) {
        event.preventDefault();
      } else {
        onCancel?.(event);
      }
    },
    [closedBy, onCancel],
  );
}

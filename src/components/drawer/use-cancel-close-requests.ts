import { useCallback } from 'react'
import type { ReactEventHandler } from 'react'

export default function useCancelCloseRequests(
  closedBy: 'closerequest' | 'none',
  onCancel?: ReactEventHandler<HTMLDialogElement>,
): ReactEventHandler<HTMLDialogElement> {
  return useCallback<ReactEventHandler<HTMLDialogElement>>(
    (event) => {
      // NOTE: We're using event.preventDefault() to simulate the `closedBy` attribute of the HTML dialog element.
      // This is because the `closedBy` attribute is not yet supported in all browsers. In the interim, we cancel
      // dialog "cancel" events if the `closedBy` prop is set to "none", as "none" means the drawer should only be
      // closable by a developer-specified mechanism (e.g. a button that calls `HTMLDialogElement.close()`).
      //
      // It's also import to note that we can only cancel the event if it is emitted by the browser. There are cases
      // where a cancel event is not emitted by the browser when Esc is pressed, only a close event. In these cases,
      // the drawer will always close.
      //
      // See https://issues.chromium.org/issues/41491338 and https://issues.chromium.org/issues/41484805 for ongoing
      // discussions about this behaviour.
      if (closedBy === 'none') {
        event.preventDefault()
      } else {
        onCancel?.(event)
      }
    },
    [closedBy, onCancel],
  )
}

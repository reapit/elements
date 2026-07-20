import { forwardRef } from 'react'
import { maybeCloseOnBackdropClick } from './close-on-backdrop-click'
import { useCancelCloseRequests } from './use-cancel-close-requests'
import { useWithStopPropagation } from '#src/utils/events'

import type { DialogHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace HTMLDialog {
  export interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
    /**
     * Specifies the types of user actions that can be used to close the dialog.
     *
     * - `any`: Dialog can be closed by clicking backdrop, pressing Esc, or developer mechanism
     * - `closerequest`: Dialog can be dismissed with platform action or developer mechanism (default)
     * - `none`: Dialog cannot be closed by the user
     */
    closedBy?: 'any' | 'closerequest' | 'none'
    /** Dialog content */
    children: ReactNode
    /**
     * Only relevant when `closedBy` is `'any'`. Whether a backdrop click should be fully
     * consumed by dismissal, preventing the same click from also activating an element on
     * the page behind the backdrop.
     *
     * Set this to `false` only when the backdrop is fully transparent and exposes real page
     * content underneath (e.g. a popover-style dialog anchored near its trigger) - there, a
     * native pass-through click (dismiss and activate the element behind in one gesture) is
     * the expected UX, like a native `<select>`.
     *
     * **Known limitation:** the one-gesture dismiss-and-activate behaviour is only reliable
     * for touch/pen. For mouse, `mousedown` hits the dialog (still open) but `mouseup` hits
     * the newly-exposed element (dialog already closed) - browsers don't fire `click` on that
     * element when its `mousedown`/`mouseup` targets differ like this, so mouse users get two
     * separate clicks instead: one to dismiss, one to activate. Inherent browser behaviour,
     * not something `HTMLDialog` controls - tracked upstream at
     * {@link https://bugzilla.mozilla.org/show_bug.cgi?id=1755498 | Firefox} and
     * {@link https://bugs.webkit.org/show_bug.cgi?id=49297 | WebKit}; revisit this limitation
     * if either lands.
     *
     * @default true
     */
    consumeBackdropClick?: boolean
  }
}

/**
 * A native <dialog> component that:
 *
 * - Stops close event propagation (prevents nested dialogs from closing their parents)
 * - Polyfills closedBy attribute (Safari compatibility)
 * - Handles backdrop clicks correctly, including working around the native `closedby="any"`
 *   light-dismiss algorithm closing the dialog before the triggering click can be hit-tested,
 *   which otherwise lets that same click also activate whatever is exposed behind the backdrop
 *   (see `consumeBackdropClick`)
 *
 * Use this as the foundation for all dialog-based components instead of
 * using <dialog> directly.
 */
export const HTMLDialog = forwardRef<HTMLDialogElement, HTMLDialog.Props>(
  ({ closedBy = 'closerequest', consumeBackdropClick = true, onCancel, onClose, onClick, children, ...rest }, ref) => {
    const handleCancel = useCancelCloseRequests(closedBy, onCancel)
    const handleClose = useWithStopPropagation(onClose)

    const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
      onClick?.(event)
      maybeCloseOnBackdropClick(event, closedBy, consumeBackdropClick)
    }

    // Render 'closerequest' instead of 'any' when consuming backdrop clicks ourselves - this
    // disables native light-dismiss (see `maybeCloseOnBackdropClick`) while still permitting
    // Esc/platform close-request natively.
    const realClosedBy = closedBy === 'any' && consumeBackdropClick ? 'closerequest' : closedBy

    return (
      <dialog
        {...rest}
        ref={ref}
        /* oxlint-disable-next-line react/no-unknown-property -- closedby not yet in React types */
        closedby={realClosedBy}
        onCancel={handleCancel}
        onClose={handleClose}
        onClick={handleClick}
      >
        {children}
      </dialog>
    )
  },
)

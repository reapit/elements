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
  }
}

/**
 * A native <dialog> component that:
 *
 * - Stops close event propagation (prevents nested dialogs from closing their parents)
 * - Polyfills closedBy attribute (Safari compatibility)
 * - Handles backdrop clicks correctly
 *
 * Use this as the foundation for all dialog-based components instead of
 * using <dialog> directly.
 */
export const HTMLDialog = forwardRef<HTMLDialogElement, HTMLDialog.Props>(
  ({ closedBy = 'closerequest', onCancel, onClose, onClick, children, ...rest }, ref) => {
    const handleCancel = useCancelCloseRequests(closedBy, onCancel)
    const handleClose = useWithStopPropagation(onClose)

    const handleClick: MouseEventHandler<HTMLDialogElement> = (event) => {
      onClick?.(event)
      maybeCloseOnBackdropClick(event)
    }

    return (
      <dialog
        {...rest}
        ref={ref}
        /* oxlint-disable-next-line react/no-unknown-property -- closedby not yet in React types */
        closedby={closedBy}
        onCancel={handleCancel}
        onClose={handleClose}
        onClick={handleClick}
      >
        {children}
      </dialog>
    )
  },
)

import { cx } from '@linaria/core'
import { DialogBody } from './body'
import { DialogContext, useDialogContext } from './context'
import { DialogFooter } from './footer'
import { DialogHeader } from './header'
import { elDialog } from './styles'
import { HTMLDialog, getClosestDialogElement, useDialogOpenController, useDialogOpenState } from '#src/utils/dialog'
import { ToastOutlet } from '#src/core/toaster'
import { useId } from 'react'

import type { DialogHTMLAttributes, ReactNode } from 'react'

export namespace Dialog {
  // NOTE: we omit..
  // - `open` because we do not want React consumers to use it directly as it results in a non-modal experience.
  //     Instead, our React `Dialog` component provides an `isOpen` prop that ensures a modal experience is achieved.
  type AttributesToOmit = 'open'

  export interface Props extends Omit<DialogHTMLAttributes<HTMLDialogElement>, AttributesToOmit> {
    /** The dialog content */
    children: ReactNode
    /**
     * Specifies the types of user actions that can be used to close the dialog. This property distinguishes
     * three methods by which a dialog can be closed:
     *
     * - A _light dismiss user action_, in which the dialog is closed when the user clicks or taps
     * outside it. This is equivalent to the "light dismiss" behavior of "auto" state popovers.
     * - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back"
     * or "dismiss" gesture on mobile platforms.
     * - A developer-specified mechanism such as a `<button>` with a `click` handler that invokes
     * `HTMLDialogElement.close()` or a `<form>` submission.
     *
     * Possible values are:
     *
     *  - `any`: The dialog can be closed by clicking on the backdrop, pressing the `Esc` key, or a
     *    developer-specified mechanism. This is useful for lightweight dismissible dialogs.
     *  - `closerequest`: The dialog can be dismissed with a platform-specific user action or a
     *    developer-specified mechanism. This is what detail dialogs should use.
     *  - `none`: The dialog cannot be closed by the user (e.g. via the close button). This is what form dialogs
     *    should use.
     *
     * **note:** Backdrop dismissal for `any` is always handled in JS rather than delegated to the browser's
     * native light-dismiss, to avoid closing the dialog before the triggering click can be hit-tested (which
     * would let that click also activate an element behind the backdrop). Separately, Safari does not support
     * the `closedBy` attribute at all, so "back"/"dismiss" gestures on mobile Safari won't close the dialog.
     */
    closedBy?: 'any' | 'closerequest' | 'none'
    /** Indicates whether the dialog is open or not */
    isOpen?: boolean
    /** The size of the dialog. */
    size: 'small' | 'medium' | 'large' | 'full-screen'
  }
}

/**
 * The Dialog appears over the screen to get the user's attention. It lets users see more details or do tasks
 * without leaving the page. The layout changes based on the options, with content grouped into clear sections.
 *
 * The Dialog is built with the [\<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 * and is always shown using the dialog's
 * [showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) method. This ensures
 * focus will be is set on the first nested focusable element of the dialog. Further, all content beneath a dialog is
 * made [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and focus is trapped within
 * the drawer. See the [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
 * section of MDN's `<dialog>` documentation.
 */
export function Dialog({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  closedBy = 'closerequest',
  isOpen: isOpenProp,
  onCancel,
  onClose,
  onClick,
  size,
  ...rest
}: Dialog.Props) {
  // We need to imperatively show or close the dialog element when the `isOpen` prop changes.
  const ref = useDialogOpenController(isOpenProp)
  // We need to track the DOM-held open state of the dialog element to ensure we can show/hide our children.
  const isOpen = useDialogOpenState(ref)

  const titleId = useId()

  return (
    <HTMLDialog
      {...rest}
      aria-labelledby={ariaLabelledBy ?? titleId}
      data-size={size}
      className={cx(elDialog, className)}
      closedBy={closedBy}
      ref={ref}
      onCancel={onCancel}
      onClose={onClose}
      onClick={onClick}
    >
      <DialogContext.Provider value={{ titleId }}>
        {/*
         * Note: We only mount children when the dialog is open. This is because dialog content will often fetch
         * its own data and we do not want those network requests occurring when the dialog is mounted but closed.
         */}
        {isOpen && children}
      </DialogContext.Provider>
      {isOpen && <ToastOutlet />}
    </HTMLDialog>
  )
}

Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Header = DialogHeader
Dialog.HeaderCloseButton = DialogHeader.CloseButton

Dialog.Context = DialogContext
Dialog.useContext = useDialogContext

Dialog.getClosestDialogElement = getClosestDialogElement

export { getClosestDialogElement } from '#src/utils/dialog'

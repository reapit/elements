import { DialogBody } from './body'
import { DialogContextProvider } from './context'
import { DialogFooter } from './footer'
import { DialogHeader } from './header'
import { ElDialog } from './styles'
import { useDialogController, useDialogObserver, useCancelCloseRequests, useWithStopPropagation } from '../drawer'
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
     * two methods by which a dialog can be closed:
     *
     *  (1) A platform-specific user action, such as pressing the `Esc` key on desktop platforms, or a "back" or
     *    "dismiss" gesture on mobile platforms.
     *
     *  (2) A developer-specified mechanism such as the dialog close button and a `<form>` submission.
     *
     * Possible values are:
     *
     *  - `closerequest`: The dialog can be dismissed with a platform-specific user action or a
     *    developer-specified mechanism. This is what detail dialogs should use.
     *
     *  - `none`: The dialog cannot be closed by the user (e.g. via the close button). This is what form dialogs
     *    should use.
     *
     * **Note:** The `closedby` attribute for the HTML `<dialog>` element is experimental. We currently approximate
     * its behaviour internally, but we are not using the attribute itself.
     *
     * **Note 2:** The HTML `<dialog>` element distinguishes a third method, `any`, for closing a dialog element,
     * but Dialog does not currently support it. See MDN's
     * [closedBy](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby)
     * attribute docs for more information.
     *
     * **Note 3:** The `closedBy` attribute is not supported in all browsers. We currently approximate its behaviour
     * internally, but we are not using the attribute itself.
     */
    closedBy?: 'closerequest' | 'none'
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
  closedBy = 'closerequest',
  isOpen: isOpenProp,
  onCancel: onCancelProp,
  onClose: onCloseProp,
  size,
  ...rest
}: Dialog.Props) {
  // We need to imperatively show or close the dialog element when the `isOpen` prop changes.
  const ref = useDialogController(isOpenProp)
  // We need to track the DOM-held open state of the dialog element to ensure we can show/hide our children.
  const isOpen = useDialogObserver(ref)

  const titleId = useId()

  // NOTE: Not all browsers support the `closedBy` attribute, so we need to approximate it. We do that by trying
  // to cancel any `cancel` events emitted by the browser when the dialog close request is made. Importantly, the
  // browser will not always emit a `cancel` event as it has anti-spam measures in place.
  const onCancel = useCancelCloseRequests(closedBy, onCancelProp)

  // NOTE: React's `onClose` event handler for <dialog> elements propagates, but we don't want it to.
  // The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility) explicitly
  // states dialogs should be closed one-at-a-time and it's possible we will have nested dialogs (and thus,
  // nested dialogs).
  const onClose = useWithStopPropagation(onCloseProp)

  return (
    <ElDialog
      {...rest}
      aria-labelledby={ariaLabelledBy ?? titleId}
      data-size={size}
      ref={ref}
      onCancel={onCancel}
      onClose={onClose}
    >
      <DialogContextProvider dialogRef={ref} titleId={titleId}>
        {/*
         * Note: We only mount children when the dialog is open. This is because dialog content will often fetch
         * its own data and we do not want those network requests occurring when the dialog is mounted but closed.
         */}
        {isOpen && children}
      </DialogContextProvider>
    </ElDialog>
  )
}

Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Header = DialogHeader
Dialog.HeaderCloseButton = DialogHeader.CloseButton

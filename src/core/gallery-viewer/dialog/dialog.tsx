import { cx } from '@linaria/core'
import { GalleryViewerDialogContext, useGalleryViewerDialogContext } from './context'
import { elGalleryViewerDialog } from './styles'
import { HTMLDialog, getClosestDialogElement, useDialogOpenController, useDialogOpenState } from '#src/utils/dialog'
import { useId } from 'react'

import { GalleryViewerDialogHeader } from './header'
import { GalleryViewerDialogContent } from './content'

import type { DialogHTMLAttributes, ReactNode } from 'react'

export namespace GalleryViewerDialog {
  // NOTE: we omit..
  // - `open` because we do not want React consumers to use it directly as it results in a non-modal experience.
  //     Instead, our React `GalleryViewerDialog` component provides an `isOpen` prop that ensures a modal
  //     experience is achieved.
  type AttributesToOmit = 'open'

  export interface Props extends Omit<DialogHTMLAttributes<HTMLDialogElement>, AttributesToOmit> {
    /** The dialog content */
    children?: ReactNode
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
     *    developer-specified mechanism. Gallery viewers are typically dismissed by clicking the backdrop,
     *    so this is the default.
     *  - `closerequest`: The dialog can be dismissed with a platform-specific user action or a
     *    developer-specified mechanism.
     *  - `none`: The dialog cannot be closed by the user.
     *
     * **note:** Safari does not currently support `closedBy`. `GalleryViewerDialog` attempts to polyfill
     * its behaviour, but it's not perfect. Namely, "back" or "dismiss" gestures on mobile platforms are
     * not supported.
     */
    closedBy?: 'any' | 'closerequest' | 'none'
    /** Indicates whether the dialog is open or not */
    isOpen?: boolean
  }
}

/**
 * The GalleryViewerDialog is a responsive full-screen overlay for displaying gallery content.
 *
 * On large screens (≥1440px) it appears as an inset dialog with a semi-transparent backdrop and
 * rounded corners. On smaller screens it fills the entire viewport with no backdrop.
 *
 * The dialog is built with the [\<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 * and is always shown using the dialog's
 * [showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) method. This ensures
 * focus is set on the first nested focusable element of the dialog. Further, all content beneath a dialog is
 * made [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and focus is trapped
 * within the dialog. See the [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
 * section of MDN's `<dialog>` documentation.
 */
export function GalleryViewerDialog({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  closedBy = 'any',
  isOpen: isOpenProp,
  onCancel,
  onClose,
  onClick,
  ...rest
}: GalleryViewerDialog.Props) {
  // We need to imperatively show or close the dialog element when the `isOpen` prop changes.
  const ref = useDialogOpenController(isOpenProp)
  // We need to track the DOM-held open state of the dialog element to ensure we can show/hide our children.
  const isOpen = useDialogOpenState(ref)

  const titleId = useId()

  return (
    <HTMLDialog
      {...rest}
      aria-labelledby={ariaLabelledBy ?? titleId}
      className={cx(elGalleryViewerDialog, className)}
      closedBy={closedBy}
      ref={ref}
      onCancel={onCancel}
      onClose={onClose}
      onClick={onClick}
    >
      <GalleryViewerDialogContext.Provider value={{ titleId }}>
        {/*
         * Note: We only mount children when the dialog is open. This is because dialog content will often fetch
         * its own data and we do not want those network requests occurring when the dialog is mounted but closed.
         */}
        {isOpen && children}
      </GalleryViewerDialogContext.Provider>
    </HTMLDialog>
  )
}

GalleryViewerDialog.Context = GalleryViewerDialogContext
GalleryViewerDialog.useContext = useGalleryViewerDialogContext

GalleryViewerDialog.Header = GalleryViewerDialogHeader
GalleryViewerDialog.Content = GalleryViewerDialogContent

GalleryViewerDialog.getClosestDialogElement = getClosestDialogElement

export { getClosestDialogElement } from '#src/utils/dialog'

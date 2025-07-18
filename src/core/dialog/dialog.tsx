import { DialogHTMLAttributes, FC, PropsWithChildren, useRef } from 'react'

import {
  ElDialog,
  ElDialogBody,
  ElDialogFooter,
  ElDialogHeader,
  ElDialogTitle,
  MediumDialogSize,
  SmallDialogSize,
} from './styles'
import { useToggleDialogVisibilityEffect } from './use-toggle-dialog-visibility-effect'

interface DialogAttributes extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'> {}

export interface DialogProps extends DialogAttributes {
  /**
   * Whether the dialog is open or not
   *
   * @default false
   */
  isOpen: boolean

  /**
   * Invoked function when the dialog is closed
   */
  onClose?: () => void

  size?: SmallDialogSize | MediumDialogSize
}

type DialogFC = FC<PropsWithChildren<DialogProps>> & {
  Header: typeof ElDialogHeader
  Title: typeof ElDialogTitle
  Body: typeof ElDialogBody
  Footer: typeof ElDialogFooter
}

/**
 * The `Dialog` component is a wrapper around the prefixed `ELDialog*` that provides
 * a more convenient way to render the dialog content for React users.
 */
const Dialog: DialogFC = ({ children, isOpen = false, onClose, size, ...props }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useToggleDialogVisibilityEffect({ ref, isOpen, onClose })

  return (
    <ElDialog {...props} ref={ref} data-size={size}>
      {children}
    </ElDialog>
  )
}

Dialog.Header = ElDialogHeader
Dialog.Title = ElDialogTitle
Dialog.Body = ElDialogBody
Dialog.Footer = ElDialogFooter

export { Dialog }

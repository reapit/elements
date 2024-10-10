import { FC, ReactNode } from 'react'

import { DialogContainerProps, DialogFooterItems } from './types'
import { Dialog } from './dialog.atoms'
import { useDialogAppearance } from './use-dialog-appearance'

export interface DialogProps extends DialogContainerProps {
  /**
   * Whether the dialog is open or not.
   *
   * @default false
   */
  isOpen: boolean

  /**
   * Function that has the responsibility to close the dialog.
   */
  handleCloseDialog: () => void

  /**
   * Renders the title of the dialog. It must be a string, and is optional
   */
  title?: string

  /**
   * The content of the dialog, which will be placed within the `Dialog.Body`.
   */
  children?: ReactNode

  /**
   * The footer JSX content of the dialog, which will be placed within the `Dialog.Footer`.
   */
  footerItems: DialogFooterItems
}

/**
 * The `Dialog` component is a wrapper around the `Dialog` atoms that provides
 * a more convenient way to render the dialog content.
 *
 * This component is intended to be used as a controlled component, meaning that it should be
 * used in conjunction with the `useDialog` hook to manage the state of the dialog
 * and ensure that it is properly rendered and styled.
 */
const DialogComposed: FC<DialogProps> = ({
  title,
  footerItems,
  children,
  isOpen = false,
  handleCloseDialog,
  ...props
}) => {
  const ref = useDialogAppearance({ isOpen, onClose: handleCloseDialog })

  return (
    <Dialog {...props} ref={ref}>
      <Dialog.Title title={title} />
      <Dialog.Body>{children}</Dialog.Body>
      <Dialog.Footer>{footerItems({ closeDialog: handleCloseDialog })}</Dialog.Footer>
    </Dialog>
  )
}

export { DialogComposed as Dialog }

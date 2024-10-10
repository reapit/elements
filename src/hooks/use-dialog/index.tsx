import { FC, useMemo, useState } from 'react'

import { Dialog, DialogProps } from '../../components/dialog'

type RestrictedDialogComponentProps = Partial<DialogProps> & { footerItems: DialogProps['footerItems'] }

export type UseDialog = [
  Dialog: FC<RestrictedDialogComponentProps>,
  closeDialog: () => void,
  openDialog: () => void,
  dialogIsOpen: boolean,
]

/**
 * A hook for creating a dialog component.
 * This hook have an isolated state that already handle to close and open the dialog.
 *
 * The returned type for this hook is a tuple
 * 1. The dialog component
 * 2. A function to close the dialog
 * 3. A function to open the dialog
 * 4. A boolean indicating whether the dialog is open
 */
export const useDialog = (): UseDialog => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const DialogComponent: FC<RestrictedDialogComponentProps> = ({
    children,
    isOpen = isDialogOpen,
    handleCloseDialog = closeDialog,
    ...rest
  }) => (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} {...rest}>
      {children}
    </Dialog>
  )

  return useMemo(() => [DialogComponent, openDialog, closeDialog, isDialogOpen], [isDialogOpen])
}

import { useDialogContext } from '../context'
import { DialogHeaderCloseButton } from './close-button'
import { ElDialogHeader, ElDialogHeaderAction, ElDialogHeaderContentContainer, ElDialogHeaderTitle } from './styles'
import type { ComponentProps, ReactNode } from 'react'

export namespace DialogHeader {
  export interface Props extends Omit<ComponentProps<typeof ElDialogHeader>, 'title'> {
    /** Optional close action for the dialog. Should not be used when the dialog contains a form. */
    action?: ReactNode
    /**
     * The accessible label for the dialog. This should always be provided when the dialog has no visible
     * title (i.e. `children`).
     */
    'aria-label'?: string
    /** The title of the dialog. */
    children?: ReactNode
  }
}

/**
 * A header for dialogs. Contains the dialog's title, as well as an optional action (close button).
 */
export function DialogHeader({ action, children, 'aria-label': ariaLabel, ...rest }: DialogHeader.Props) {
  const { titleId } = useDialogContext() ?? {}
  return (
    // NOTE: If we don't have a visible title, we should have an aria-label on this root element.
    <ElDialogHeader {...rest} aria-label={ariaLabel} id={!children ? titleId : undefined}>
      <ElDialogHeaderContentContainer>
        {action && <ElDialogHeaderAction>{action}</ElDialogHeaderAction>}
        {children && <ElDialogHeaderTitle id={titleId}>{children}</ElDialogHeaderTitle>}
      </ElDialogHeaderContentContainer>
    </ElDialogHeader>
  )
}

DialogHeader.CloseButton = DialogHeaderCloseButton

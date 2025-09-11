import { ElDialogFooter } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace DialogFooter {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The footer actions. Typically one or more buttons. */
    children: ReactNode
  }
}

/**
 * A footer for dialogs. Typically used to display a set of actions related to the dialog's content (e.g.
 * "Save" and "Cancel" buttons when the dialog contains a form).
 */
export function DialogFooter({ children, ...rest }: DialogFooter.Props) {
  return <ElDialogFooter {...rest}>{children}</ElDialogFooter>
}

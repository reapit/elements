import { ElDialogBody } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dialog's body.
   */
  children: ReactNode
}

/**
 * The body of the dialog. This is where the dialog's primary content goes. It will fill the width of its
 * container and grow to the height of its content. Like the dialog's header and footer, the body also
 * adjusts its padding based on the inline-size of the dialog.
 */
export function DialogBody({ children, ...rest }: DialogBodyProps) {
  return <ElDialogBody {...rest}>{children}</ElDialogBody>
}

import { ElDialogBody } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export namespace DialogBody {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The content of the dialog's body.
     */
    children: ReactNode
  }
}

/**
 * The body of the dialog. This is where the dialog's primary content goes. It will fill the width of its
 * container and grow to the height of its content. Like the dialog's header and footer, the body also
 * adjusts its padding based on the inline-size of the dialog.
 */
export function DialogBody({ children, ...rest }: DialogBody.Props) {
  return <ElDialogBody {...rest}>{children}</ElDialogBody>
}

DialogBody.displayName = 'Dialog.Body'

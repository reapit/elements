import { ElDrawerFooter } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace DrawerFooter {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The footer actions. Typically one or more buttons. */
    children: ReactNode
  }
}

/**
 * A footer for drawers. Typically used to display a set of actions related to the drawer's content (e.g.
 * "Save" and "Cancel" buttons when the drawer contains a form).
 */
export function DrawerFooter({ children, ...rest }: DrawerFooter.Props) {
  return <ElDrawerFooter {...rest}>{children}</ElDrawerFooter>
}

import { ElDrawerBody } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the drawer's body.
   */
  children: ReactNode
}

/**
 * The body of the drawer. This is where the drawer's primary content goes. It will fill the width of its
 * container and grow to the height of its content. Like the drawer's header and footer, the body also
 * adjusts its padding based on the inline-size of the drawer.
 */
export function DrawerBody({ children, ...rest }: DrawerBodyProps) {
  return <ElDrawerBody {...rest}>{children}</ElDrawerBody>
}

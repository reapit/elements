import { ElDrawerBody } from './styles'
import type { ComponentProps, ReactNode } from 'react'

interface DrawerBodyProps extends ComponentProps<typeof ElDrawerBody> {
  children: ReactNode
}

/**
 * The body of the drawer. This is where the drawer's content goes.
 */
export default function DrawerBody({ children, ...rest }: DrawerBodyProps) {
  return <ElDrawerBody {...rest}>{children}</ElDrawerBody>
}

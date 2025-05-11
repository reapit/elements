import { ElDrawerFormFooter, ElDrawerFormFooterPrimaryActions, ElDrawerFormFooterSupplementaryAction } from './styles'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

interface DrawerFormFooterProps extends ComponentProps<typeof ElDrawerFormFooter> {
  children: ReactNode
  supplementaryAction?: ReactNode
}

/**
 * A footer for form drawers.
 */
export default function DrawerFormFooter({ children, supplementaryAction, ...rest }: DrawerFormFooterProps) {
  return (
    <ElDrawerFormFooter {...rest}>
      <ElDrawerFormFooterSupplementaryAction>{supplementaryAction}</ElDrawerFormFooterSupplementaryAction>
      <ElDrawerFormFooterPrimaryActions>{children}</ElDrawerFormFooterPrimaryActions>
    </ElDrawerFormFooter>
  )
}

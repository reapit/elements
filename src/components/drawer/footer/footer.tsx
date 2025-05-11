import { ElDrawerFooter, ElDrawerFooterPrimaryActions, ElDrawerFooterSupplementaryAction } from './styles'

import type { ComponentProps, ReactNode } from 'react'

interface DrawerFooterProps extends ComponentProps<typeof ElDrawerFooter> {
  children: ReactNode
  supplementaryAction?: ReactNode
}

/**
 * A footer for drawers.
 */
export function DrawerFooter({ children, supplementaryAction, ...rest }: DrawerFooterProps) {
  return (
    <ElDrawerFooter {...rest}>
      <ElDrawerFooterSupplementaryAction>{supplementaryAction}</ElDrawerFooterSupplementaryAction>
      <ElDrawerFooterPrimaryActions>{children}</ElDrawerFooterPrimaryActions>
    </ElDrawerFooter>
  )
}

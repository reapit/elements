import { ElTopBarMenuDrawerMenuItemBadge } from '../menu-item'
import { ElTopBarMenuDrawerSubmenuItemLabel } from './styles'
import type { ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenuItemBase {
  export interface Props {
    children: ReactNode
    hasBadge?: boolean
  }
}

/**
 * Base component for menu drawer submenu items. Provides shared label structure.
 * Not exported publicly - used internally by anchor and button variants.
 */
export function TopBarMenuDrawerSubmenuItemBase({ children, hasBadge }: TopBarMenuDrawerSubmenuItemBase.Props) {
  return (
    <>
      <ElTopBarMenuDrawerSubmenuItemLabel>{children}</ElTopBarMenuDrawerSubmenuItemLabel>
      {hasBadge && <ElTopBarMenuDrawerMenuItemBadge aria-hidden />}
    </>
  )
}

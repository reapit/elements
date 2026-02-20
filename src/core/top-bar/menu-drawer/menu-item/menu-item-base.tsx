import { ElTopBarMenuDrawerMenuItemBadge, ElTopBarMenuDrawerMenuItemLabel } from './styles'
import type { ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItemBase {
  export interface Props {
    children: ReactNode
    hasBadge?: boolean
  }
}

/**
 * Base component for menu drawer items. Provides shared label structure.
 * Not exported publicly - used internally by anchor and button variants.
 */
export function TopBarMenuDrawerMenuItemBase({ children, hasBadge }: TopBarMenuDrawerMenuItemBase.Props) {
  return (
    <>
      <ElTopBarMenuDrawerMenuItemLabel>{children}</ElTopBarMenuDrawerMenuItemLabel>
      {hasBadge && <ElTopBarMenuDrawerMenuItemBadge aria-hidden />}
    </>
  )
}

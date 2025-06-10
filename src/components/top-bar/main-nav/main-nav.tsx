import { ElTopBarMainNav, ElTopBarMainNavList } from './styles'
import { TopBarMainNavListItem } from './main-nav-list-item'
import { TopBarMainNavMenuListItem } from './main-nav-menu-list-item'

import type { ComponentProps, ReactNode } from 'react'

interface TopBarMainNavProps extends ComponentProps<typeof ElTopBarMainNav> {
  /**
   * The accessible name for the main navigation.
   * @default 'Main navigation'
   */
  'aria-label'?: string
  /**
   * The main navigation items for the product. Typically a collection of `TopBar.NavItem` and `TopBar.NavMenuItem`.
   */
  children: ReactNode
}

/**
 * A simple navigation list for use in a `TopBar`. Typically used via `TopBar.MainNav`, it will often contain a
 * collection of `TopBar.NavItem` and `TopBar.NavMenuItem` children. Only one item, if any, in the main nav
 * should represent the current page at any given time.
 */
export function TopBarMainNav({ 'aria-label': ariaLabel = 'Main navigation', children, ...rest }: TopBarMainNavProps) {
  return (
    <ElTopBarMainNav {...rest} aria-label={ariaLabel}>
      <ElTopBarMainNavList>{children}</ElTopBarMainNavList>
    </ElTopBarMainNav>
  )
}

TopBarMainNav.Item = TopBarMainNavListItem
TopBarMainNav.MenuItem = TopBarMainNavMenuListItem

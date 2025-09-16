import { ElTopBarSecondaryNav, ElTopBarSecondaryNavList } from './styles'
import { TopBarSecondaryNavListItem } from './secondary-nav-list-item'
import { TopBarSecondaryNavMenuListItem } from './secondary-nav-menu-list-item'

import type { ComponentProps, ReactNode } from 'react'

export namespace TopBarSecondaryNav {
  export interface Props extends ComponentProps<typeof ElTopBarSecondaryNav> {
    /**
     * The accessible name for the secondary navigation.
     * @default 'Secondary navigation'
     */
    'aria-label'?: string
    /**
     * The secondary navigation items for the product. Typically a collection of `TopBar.NavIconItem`'s.
     */
    children: ReactNode
  }
}

/**
 * A simple navigation list for use in a `TopBar`. Typically used via `TopBar.SecondaryNav`. The secondary nav itself
 * will typically contain a collection of `TopBar.NavIconItem`'s as children. Only one item, if any, in the top bar
 * should represent the current page at any given time.
 */
export function TopBarSecondaryNav({
  'aria-label': ariaLabel = 'Secondary navigation',
  children,
  ...rest
}: TopBarSecondaryNav.Props) {
  return (
    <ElTopBarSecondaryNav {...rest} aria-label={ariaLabel}>
      <ElTopBarSecondaryNavList>{children}</ElTopBarSecondaryNavList>
    </ElTopBarSecondaryNav>
  )
}

TopBarSecondaryNav.displayName = 'TopBar.SecondaryNav'

TopBarSecondaryNav.Item = TopBarSecondaryNavListItem
TopBarSecondaryNav.MenuItem = TopBarSecondaryNavMenuListItem

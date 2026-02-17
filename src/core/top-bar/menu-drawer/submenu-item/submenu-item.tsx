import { cx } from '@linaria/core'
import { elTopBarMenuDrawerSubmenuItem } from './styles'
import { TopBarMenuDrawerSubmenuItemBase } from './submenu-item-base'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenuItem {
  export interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-current'> {
    /**
     * When the item represents the current page, `aria-current="page"` should be supplied.
     */
    'aria-current': 'page' | false
    /**
     * The label of the menu item.
     */
    children: ReactNode
    /**
     * The URL to navigate to when this item is activated.
     */
    href: string
  }
}

/**
 * A simple anchor-based submenu item for use in TopBar MenuDrawer submenus.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.MenuSubmenuItem`
 * as it wraps the anchor element in a list item (`<li>`) to ensure good semantics and accessibility.
 */
export function TopBarMenuDrawerSubmenuItem({
  'aria-current': ariaCurrent,
  children,
  className,
  ...rest
}: TopBarMenuDrawerSubmenuItem.Props) {
  return (
    <a {...rest} aria-current={ariaCurrent} className={cx(elTopBarMenuDrawerSubmenuItem, className)}>
      <TopBarMenuDrawerSubmenuItemBase>{children}</TopBarMenuDrawerSubmenuItemBase>
    </a>
  )
}

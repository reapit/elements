import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuItem } from './styles'
import { TopBarMenuDrawerMenuItemBase } from './menu-item-base'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItem {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * When the item represents the current page, `aria-current="page"` should be supplied.
     */
    'aria-current': 'page' | false
    /**
     * The label of the menu item.
     */
    children: ReactNode
    /**
     * Whether the menu item has a notification badge.
     */
    hasBadge?: boolean
    /**
     * The URL to navigate to when this item is activated.
     */
    href: string
  }
}

/**
 * Simple anchor-based menu item for use in `TopBar.Menu`. Always navigates to another page.
 * Use via `TopBar.MenuItem`.
 */
export function TopBarMenuDrawerMenuItem({
  'aria-current': ariaCurrent,
  children,
  className,
  hasBadge,
  ...rest
}: TopBarMenuDrawerMenuItem.Props) {
  return (
    <a {...rest} aria-current={ariaCurrent} className={cx(elTopBarMenuDrawerMenuItem, className)}>
      <TopBarMenuDrawerMenuItemBase hasBadge={hasBadge}>{children}</TopBarMenuDrawerMenuItemBase>
    </a>
  )
}

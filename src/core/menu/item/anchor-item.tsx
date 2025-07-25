import { MenuItemBase } from './item-base'

import type { AnchorHTMLAttributes } from 'react'
import type { CommonMenuItemBaseProps } from './item-base'

export interface MenuAnchorItemProps extends CommonMenuItemBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether the menu item represents the current page */
  'aria-current'?: 'page' | false
  /** The URL to which this menu anchor item navigates */
  href: string
}

/**
 * A menu item component that renders as an anchor element for navigation.
 *
 * Use `Menu.AnchorItem` when you need menu item styling but want to navigate to a URL.
 * Use `Menu.Item` when the action needs to occur on click.
 */
export function AnchorMenuItem(props: MenuAnchorItemProps) {
  return <MenuItemBase as="a" {...props} />
}

import { cx } from '@linaria/core'
import { elTopBarMenuDrawerSubmenuItem } from './styles'
import { TopBarMenuDrawerSubmenuItemBase } from './submenu-item-base'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenuItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The label of the menu item.
     */
    children: ReactNode
  }
}

/**
 * A simple button-based submenu item for use in TopBar MenuDrawer submenus.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.MenuSubmenuItemButton`
 * as it wraps the button element in a list item (`<li>`) to ensure good semantics and accessibility.
 */
export function TopBarMenuDrawerSubmenuItemButton({
  children,
  className,
  type = 'button',
  ...rest
}: TopBarMenuDrawerSubmenuItemButton.Props) {
  return (
    <button {...rest} type={type} className={cx(elTopBarMenuDrawerSubmenuItem, className)}>
      <TopBarMenuDrawerSubmenuItemBase>{children}</TopBarMenuDrawerSubmenuItemBase>
    </button>
  )
}

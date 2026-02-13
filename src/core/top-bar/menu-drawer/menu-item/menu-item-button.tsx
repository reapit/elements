import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuItem } from './styles'
import { TopBarMenuDrawerMenuItemBase } from './menu-item-base'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The label of the menu item.
     */
    children: ReactNode
  }
}

/**
 * Simple button-based menu item for use in `TopBar.Menu`. Used for actions that don't navigate.
 * Use via `TopBar.MenuItemButton`.
 */
export function TopBarMenuDrawerMenuItemButton({
  children,
  className,
  type = 'button',
  ...rest
}: TopBarMenuDrawerMenuItemButton.Props) {
  return (
    <button {...rest} type={type} className={cx(elTopBarMenuDrawerMenuItem, className)}>
      <TopBarMenuDrawerMenuItemBase>{children}</TopBarMenuDrawerMenuItemBase>
    </button>
  )
}

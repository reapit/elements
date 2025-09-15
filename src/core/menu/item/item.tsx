import { MenuItemBase } from './item-base'

import type { ButtonHTMLAttributes } from 'react'
import type { MenuItemBase as MenuItemBaseNamespace } from './item-base'

export namespace MenuItem {
  export interface Props extends MenuItemBaseNamespace.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /** Whether the menu item is selected/active */
    'aria-checked'?: boolean
    /**
     * Whether the menu item is disabled or not. Unlike `aria-disabled`, menu items disabled with this prop will not be
     * focusable or interactive. Typically, disabled menu items should be focusable, so `aria-disabled` is preferred.
     */
    disabled?: boolean
  }
}

/**
 * A menu item component that renders as a button element for interactive actions.
 *
 * Use `Menu.Item` when the action needs to occur on click.
 * Use `Menu.AnchorItem` when you need menu item styling but want to navigate to a URL.
 */
export function MenuItem(props: MenuItem.Props) {
  return <MenuItemBase as="button" {...props} />
}

MenuItem.displayName = 'Menu.Item'

/** @deprecated Use MenuItem.Props instead */
export type MenuItemProps = MenuItem.Props

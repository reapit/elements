import { FC, ReactNode, useRef } from 'react'

import { useToggleDialogVisibilityEffect } from '../dialog'
import { TopBarMenuItem } from '../top-bar-menu-item'
import { TopBarMenuItemGroup } from '../top-bar-menu-item-group'

import { TopBarMenuHeader } from './top-bar-menu.atoms'
import { ElTopBarMenu, ElTopBarMenuBody, ElTopBarMenuList } from './styles'
import { TopBarMenuProvider } from './top-bar-menu-context'

export interface TopBarMenuProps {
  /** Controls whether the menu is visible */
  isOpen: boolean
  /** Content to render inside the menu */
  children: ReactNode
  /** Callback function when the menu is closed */
  onClose?: VoidFunction
}

/**
 * TopBarMenu is a side panel navigation component.
 *
 * It's designed to be used in mobile and desktop layouts and provides
 * a structured way to display navigation items.
 */
type TopBarMenuFC = FC<TopBarMenuProps> & {
  /** The header section of the menu with close button */
  Header: typeof TopBarMenuHeader
  /** The body container for menu content */
  Body: typeof ElTopBarMenuBody
  /** A grouping of menu items */
  List: typeof ElTopBarMenuList
  /** A collapsible group of menu items */
  Group: typeof TopBarMenuItemGroup
  /** An individual menu item (link or button) */
  Item: typeof TopBarMenuItem
}

const TopBarMenu: TopBarMenuFC = ({ children, isOpen, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useToggleDialogVisibilityEffect({ isOpen, ref, onClose })

  return (
    <TopBarMenuProvider onClose={onClose}>
      <ElTopBarMenu ref={ref}>{children}</ElTopBarMenu>
    </TopBarMenuProvider>
  )
}

TopBarMenu.Header = TopBarMenuHeader
TopBarMenu.Body = ElTopBarMenuBody
TopBarMenu.List = ElTopBarMenuList
TopBarMenu.Group = TopBarMenuItemGroup
TopBarMenu.Item = TopBarMenuItem

export { TopBarMenu }

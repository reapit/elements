import React, { HTMLAttributes } from 'react'
import { MenuProvider } from './menu-context'
import { MenuPopover, MenuTrigger } from './menu-popover'
import { MenuItem, MenuItemGroup, MenuList } from './menu.atoms'
import { ElMenu } from './styles'

type MenuFC = React.FC<HTMLAttributes<HTMLDivElement> & { 'data-alignment'?: 'left' | 'right' }> & {
  Item: typeof MenuItem
  Group: typeof MenuItemGroup
  Trigger: typeof MenuTrigger
  Popover: typeof MenuPopover
  List: typeof MenuList
}

const Menu: MenuFC = ({ children, ...props }) => {
  return (
    <MenuProvider>
      <ElMenu {...props}>{children}</ElMenu>
    </MenuProvider>
  )
}
Menu.Item = MenuItem
Menu.Group = MenuItemGroup
Menu.Trigger = MenuTrigger
Menu.Popover = MenuPopover
Menu.List = MenuList

export { Menu }

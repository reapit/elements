import React from 'react'
import { MenuProvider } from './menu-context'
import { MenuPopover, MenuTrigger } from './menu-popover'
import { MenuItem, MenuItemGroup } from './menu.atoms'
import { ElMenu, ElMenuList } from './styles'

type MenuFC = React.FC & {
  Item: typeof MenuItem
  Group: typeof MenuItemGroup
  Trigger: typeof MenuTrigger
  Popover: typeof MenuPopover
  List: typeof ElMenuList
}

const Menu: MenuFC = ({ children }) => {
  return (
    <MenuProvider>
      <ElMenu>{children}</ElMenu>
    </MenuProvider>
  )
}
Menu.Item = MenuItem
Menu.Group = MenuItemGroup
Menu.Trigger = MenuTrigger
Menu.Popover = MenuPopover
Menu.List = ElMenuList

export { Menu }

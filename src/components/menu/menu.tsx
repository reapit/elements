import React from 'react'
import { MenuProvider } from './menu-context'
import { MenuPopover, MenuTrigger } from './menu-popover'
import { MenuItemGroup } from './menu.atoms'
import { ElMenu, ElMenuItem, ElMenuList } from './styles'

type MenuFC = React.FC & {
  Item: typeof ElMenuItem
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
Menu.Item = ElMenuItem
Menu.Group = MenuItemGroup
Menu.Trigger = MenuTrigger
Menu.Popover = MenuPopover
Menu.List = ElMenuList

export { Menu }

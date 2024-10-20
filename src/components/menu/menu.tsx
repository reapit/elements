import React from 'react'
import { MenuPopover, MenuTrigger } from './menu-popover'
import { MenuProvider } from './menu-context'
import { ElMenu, ElMenuList } from './styles'

type MenuFC = React.FC & {
  // will be addded in next pr
  Item?: undefined
  Group?: undefined

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
Menu.Trigger = MenuTrigger
Menu.Popover = MenuPopover
Menu.List = ElMenuList

export { Menu }

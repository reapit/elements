import React, { type HTMLAttributes } from 'react'
import { DeprecatedMenuProvider } from './menu-context'
import { DeprecatedMenuPopover, DeprecatedMenuTrigger } from './menu-popover'
import { DeprecatedMenuItemGroup, DeprecatedMenuList } from './menu.atoms'
import { ElDeprecatedMenu } from './styles'
import { DeprecatedMenuItem } from './menu.molecules'

/** @deprecated */
type DeprecatedMenuFC = React.FC<HTMLAttributes<HTMLDivElement> & { 'data-alignment'?: 'left' | 'right' }> & {
  Item: typeof DeprecatedMenuItem
  Group: typeof DeprecatedMenuItemGroup
  Trigger: typeof DeprecatedMenuTrigger
  Popover: typeof DeprecatedMenuPopover
  List: typeof DeprecatedMenuList
}

/** @deprecated */
export const DeprecatedMenu: DeprecatedMenuFC = ({ children, ...props }) => {
  return (
    <DeprecatedMenuProvider>
      <ElDeprecatedMenu {...props}>{children}</ElDeprecatedMenu>
    </DeprecatedMenuProvider>
  )
}
DeprecatedMenu.Item = DeprecatedMenuItem
DeprecatedMenu.Group = DeprecatedMenuItemGroup
DeprecatedMenu.Trigger = DeprecatedMenuTrigger
DeprecatedMenu.Popover = DeprecatedMenuPopover
DeprecatedMenu.List = DeprecatedMenuList

import React from 'react'
import { Menu } from '../../../menu'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherAccessibleAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return <Menu.Group label={'YOUR APPS'}>{children}</Menu.Group>
}
export { AppSwitcherAccessibleAppsMenuGroup }

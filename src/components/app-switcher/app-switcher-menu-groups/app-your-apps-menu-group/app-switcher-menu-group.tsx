import React from 'react'
import { Menu } from '../../../menu'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherInaccessibleAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return <Menu.Group label={'EXPLORE'}>{children}</Menu.Group>
}
export { AppSwitcherInaccessibleAppsMenuGroup }

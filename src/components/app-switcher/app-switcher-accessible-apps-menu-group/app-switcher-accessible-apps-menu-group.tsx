import React from 'react'
import { Menu } from '../../menu'
import { AppMenuGroupContext } from '../app-switcher-menu-group-context'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherAccessibleAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'YOUR APPS'}>
      <AppMenuGroupContext.Provider value={true}>{children}</AppMenuGroupContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherAccessibleAppsMenuGroup }

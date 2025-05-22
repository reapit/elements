import React from 'react'
import { Menu } from '../../menu'
import { AppMenuGroupContext } from '../app-switcher-menu-group-context'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherInaccessibleAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'EXPLORE'}>
      <AppMenuGroupContext.Provider value={false}>{children}</AppMenuGroupContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherInaccessibleAppsMenuGroup }

import React from 'react'
import { Menu } from '../../menu'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherYourAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'YOUR APPS'}>
      <AppMenuGroupHasAccessContext.Provider value={true}>{children}</AppMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherYourAppsMenuGroup }

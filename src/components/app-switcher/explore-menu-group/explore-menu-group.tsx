import React from 'react'
import { Menu } from '../../menu'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'

type AppSwitcherMenuGroupProps = {
  children: React.ReactNode
}

function AppSwitcherExploreMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'EXPLORE'}>
      <AppMenuGroupHasAccessContext.Provider value={false}>{children}</AppMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherExploreMenuGroup }

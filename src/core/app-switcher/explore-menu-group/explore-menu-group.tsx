import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'
import { Menu } from '#src/deprecated/menu'

import type { ReactNode } from 'react'

interface AppSwitcherMenuGroupProps {
  children: ReactNode
}

function AppSwitcherExploreMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'EXPLORE'}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={false}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherExploreMenuGroup }

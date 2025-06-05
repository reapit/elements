import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'
import { Menu } from '../../menu'

import type { ReactNode } from 'react'

interface AppSwitcherMenuGroupProps {
  children: ReactNode
}

function AppSwitcherYourAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <Menu.Group label={'YOUR APPS'}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={true}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  )
}

export { AppSwitcherYourAppsMenuGroup }

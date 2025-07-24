import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'
import { DeprecatedMenu } from '#src/deprecated/menu'

import type { ReactNode } from 'react'

interface AppSwitcherMenuGroupProps {
  children: ReactNode
}

function AppSwitcherYourAppsMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <DeprecatedMenu.Group label={'YOUR APPS'}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={true}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </DeprecatedMenu.Group>
  )
}

export { AppSwitcherYourAppsMenuGroup }

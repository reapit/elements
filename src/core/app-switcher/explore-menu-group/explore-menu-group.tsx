import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'
import { DeprecatedMenu } from '#src/deprecated/menu'

import type { ReactNode } from 'react'

interface AppSwitcherMenuGroupProps {
  children: ReactNode
}

function AppSwitcherExploreMenuGroup({ children }: AppSwitcherMenuGroupProps) {
  return (
    <DeprecatedMenu.Group label={'EXPLORE'}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={false}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </DeprecatedMenu.Group>
  )
}

export { AppSwitcherExploreMenuGroup }

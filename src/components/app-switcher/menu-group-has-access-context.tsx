import { createContext, useContext } from 'react'

export const AppSwitcherMenuGroupHasAccessContext = createContext<boolean>(false)

export function useAppSwitcherMenuGroupHasAccessContext() {
  return useContext(AppSwitcherMenuGroupHasAccessContext)
}

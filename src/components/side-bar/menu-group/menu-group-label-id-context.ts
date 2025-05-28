import { createContext, useContext } from 'react'

export const SideBarMenuGroupLabelIdContext = createContext<string | null>(null)

export function useSideBarMenuGroupLabelIdContext(): string {
  const menuGroupId = useContext(SideBarMenuGroupLabelIdContext)
  if (!menuGroupId) {
    throw new Error('useSideBarMenuGroupIdContext must be used within a SideBarMenuGroupIdContext.Provider')
  }
  return menuGroupId
}

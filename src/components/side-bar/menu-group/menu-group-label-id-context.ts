import { createContext, useContext } from 'react'

/**
 * Simple context object to allow the SideBar.MenuGroup to automatically wire-up an `aria-labelledby` attribute
 * on the `<details>` element that references the `id` attribute of the `<summary>` element.
 */
export const SideBarMenuGroupLabelIdContext = createContext<string | null>(null)

export function useSideBarMenuGroupLabelIdContext(): string {
  const menuGroupId = useContext(SideBarMenuGroupLabelIdContext)
  if (!menuGroupId) {
    throw new Error('useSideBarMenuGroupIdContext must be used within a SideBarMenuGroupIdContext.Provider')
  }
  return menuGroupId
}

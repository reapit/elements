import { createContext, useContext } from 'react'

/**
 * Simple context object to allow the TopBar.MenuGroup to automatically wire-up an
 * `aria-labelledby` attribute on the `<details>` element that references the `id` attribute of the
 * `<summary>` element.
 */
export const TopBarMenuDrawerMenuGroupLabelIdContext = createContext<string | null>(null)

export function useTopBarMenuDrawerMenuGroupLabelIdContext(): string {
  const menuGroupId = useContext(TopBarMenuDrawerMenuGroupLabelIdContext)
  if (!menuGroupId) {
    throw new Error(
      'useTopBarMenuDrawerMenuGroupLabelIdContext must be used within a TopBarMenuDrawerMenuGroupLabelIdContext.Provider',
    )
  }
  return menuGroupId
}

import { shouldBeOpen } from './menu-group'
import { useEffect, useRef } from 'react'

import type { SideBarState } from './use-side-bar'

/**
 * A simple effect that observes changes to which item represents the current page (or active group) and
 * ensures all menu groups are closed.
 */
export function useSideBarController(sideBarState: SideBarState) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(
    function closeAllMenuGroupsWhenAriaCurrentOrDataIsActiveChange() {
      if (!ref.current) return

      // If the side bar is collapsed, all the groups will be closed and we don't need to watch
      // for changes to `aria-current` or `data-is-active`
      if (sideBarState === 'collapsed') return

      const element = ref.current
      const allMenuGroups = element.querySelectorAll('details')

      const observer = new MutationObserver(() => {
        allMenuGroups.forEach((menuGroup) => {
          // We update any open menu group's state to match what the `shouldBeOpen` function returns.
          // This is necessary because, while each menu group will open/close itself when it observes
          // a change to which of its children represents the current page, they cannot know whether
          // sibling items or groups have become the current page.
          //
          // For example, if a group is manually open by the user, but not closed, and the user then
          // navigates to a page that isn't a child of the opened group, that group will not know it
          // should be closed. Rather, the logic here will handle that case for it.
          //
          // This is why we only target open menu groups. Any closed menu groups will open themselves
          // if one of their children is now the current page.
          if (menuGroup.open) {
            menuGroup.open = shouldBeOpen(menuGroup)
          }
        })
      })

      observer.observe(element, {
        attributeFilter: ['aria-current', 'data-is-active'],
        subtree: true,
      })

      return () => {
        observer.disconnect()
      }
    },
    [sideBarState],
  )

  return ref
}

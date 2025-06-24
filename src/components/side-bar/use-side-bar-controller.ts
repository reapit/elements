import { shouldBeOpen } from './menu-group'
import { useEffect } from 'react'

import type { RefObject } from 'react'

/**
 * A simple effect that observes changes to which item represents the current page and ensures all menu groups
 * are closed.
 */
export function useSideBarController(ref: RefObject<HTMLDivElement>) {
  useEffect(
    function closeAllMenuGroupsWhenAriaCurrentChanges() {
      if (!ref.current) return

      const element = ref.current

      const observer = new MutationObserver(() => {
        const allMenuGroups = element.querySelectorAll('details')
        allMenuGroups.forEach((menuGroup) => {
          // We update the menu group's `open` state to match what the `shouldBeOpen` function returns. For most
          // menu groups, this will be `false` because it will not be the current page. However, it's possible for a
          // menu group to have become the parent of the current page, in which case we don't close it.
          menuGroup.open = shouldBeOpen(menuGroup)
        })
      })

      observer.observe(element, {
        attributeFilter: ['aria-current'],
        subtree: true,
      })

      return () => {
        observer.disconnect()
      }
    },
    [ref],
  )
}

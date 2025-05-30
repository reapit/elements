import { useLayoutEffect, useRef } from 'react'

import type { RefObject } from 'react'
import type { SideBarState } from '../use-side-bar'

/**
 * Controls the open state of a `SideBar.MenuGroup` when the `SideBar` is expanded or collapsed or when a descendant
 * comes to represent, or stops representing, the current page.
 */
export function useSideBarMenuGroupController(sideBarState: SideBarState): RefObject<HTMLDetailsElement> {
  const ref = useRef<HTMLDetailsElement>(null)

  useLayoutEffect(
    function openOrCloseMenuGroup() {
      if (!ref.current) return

      // If the sidebar is collapsed, we want the menu group to be closed.
      if (sideBarState === 'collapsed') {
        ref.current.open = false
      } else {
        // If the sidebar is expanded, and an element representing the current page is within this menu group, we
        // want the group to be open.
        if (hasCurrentPageElement(ref.current)) {
          ref.current.open = true
        }

        // We also want to observe changes to the `aria-current` attribute of the menu group's descendants so we
        // can update the group's open state as appropriate.
        const observer = createAriaCurrentObserver(ref.current)
        return () => observer.disconnect()
      }
    },
    [sideBarState],
  )

  return ref
}

/**
 * Creates a MutationObserver that listens for changes to the `aria-current` attribute within the given details element.
 * and updates the open state of that details element based on the presence of a descenant that represents the current
 * page (i.e. an element with `aria-current="page"`).
 */
function createAriaCurrentObserver(detailsElement: HTMLDetailsElement): MutationObserver {
  const observer = new MutationObserver(() => {
    // When we observe changes to the `aria-current` attribute, we want to open or close the menu element
    // based on whether it contains an element with `aria-current="page"`.
    detailsElement.open = hasCurrentPageElement(detailsElement)
  })

  // We want to observe changes to the details element's subtree, but only changes to the `aria-current` attribute.
  observer.observe(detailsElement, {
    subtree: true,
    attributeFilter: ['aria-current'],
  })

  return observer
}

/** Returns true if a descendant represents the current page  */
function hasCurrentPageElement(detailsElement: HTMLDetailsElement): boolean {
  return !!detailsElement.querySelector('[aria-current="page"]')
}

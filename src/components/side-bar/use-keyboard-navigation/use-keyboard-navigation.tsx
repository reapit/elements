import { activateLinkOnSpaceKeyDownHandler } from './activate-link-on-space-key-down-handler'
import { closeMenuGroupOnEscapeKeyDownHandler } from './close-menu-group-on-escape-key-down-handler'
import { navigateItemsOnArrowKeyDownHandler } from './navigate-items-on-arrow-key-down-handler'
import { useCallback } from 'react'

import type { KeyboardEventHandler } from 'react'

/**
 * Returns a key down event handler that facilitates navigation through the side bar's menu items via arrow keys,
 * closes menu groups when Escape is pressed, and activates links when the space key is pressed.
 */
export function useSideBarKeyboardNavigation(): KeyboardEventHandler<HTMLDivElement> {
  return useCallback((event) => {
    if (event.defaultPrevented) {
      return
    }
    activateLinkOnSpaceKeyDownHandler(event)
    navigateItemsOnArrowKeyDownHandler(event)
    closeMenuGroupOnEscapeKeyDownHandler(event)
  }, [])
}

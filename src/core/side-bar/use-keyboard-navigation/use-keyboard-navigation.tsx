import { handleArrowNavigation } from './handle-arrow-navigation'
import { handleCloseMenuGroup } from './handle-close-menu-group'
import { handleLinkActivation } from '#src/utils/keyboard-navigation'
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
    handleLinkActivation(event)
    handleArrowNavigation(event)
    handleCloseMenuGroup(event)
  }, [])
}

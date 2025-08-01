import { handleArrowNavigation, handleLinkActivation } from '#src/utils/keyboard-navigation'
import { useCallback } from 'react'

import type { KeyboardEventHandler } from 'react'

/**
 * Returns a key down event handler that facilitates navigation through the menu items via arrow keys
 * and activates links when the space key is pressed.
 */
export function useMenuKeyboardNavigation(
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>,
): KeyboardEventHandler<HTMLDivElement> {
  return useCallback(
    (event) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) {
        return
      }
      handleLinkActivation(event)
      handleArrowNavigation(event)
    },
    [onKeyDown],
  )
}

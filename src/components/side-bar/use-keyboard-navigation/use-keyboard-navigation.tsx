import { activateLinkOnSpaceKeyDownHandler } from './activate-link-on-space-key-down-handler'
import { closeMenuGroupOnEscapeKeyDownHandler } from './close-menu-group-on-escape-key-down-handler'
import { navigateItemsOnArrowKeyDownHandler } from './navigate-items-on-arrow-key-down-handler'
import { useCallback } from 'react'

import type { KeyboardEventHandler } from 'react'

/**
 *
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

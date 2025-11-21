import { useCallback } from 'react'

import type { MouseEventHandler } from 'react'

/**
 * By default, we will close the popover whenever the popover receives a click event from a
 * menu item descendant, unless the click event's default action has been prevented. To allow
 * consumers to opt-out of this for menu item click events, we call any consumer-supplied `onClick`
 * first, so it can prevent the default action. Alternatively, individual menu items may choose
 * to prevent the default action when they are clicked in order to keep the menu open.
 */
export function useCloseMenuOnClick(onClick?: MouseEventHandler<HTMLDivElement>): MouseEventHandler<HTMLDivElement> {
  return useCallback(
    (event) => {
      onClick?.(event)
      if (
        !event.defaultPrevented &&
        // We only close if the click was initiated by the user; this helps us avoid closing the menu
        // when the click was triggered by a programmatic action, such as element.click().
        event.isTrusted &&
        event.target instanceof HTMLElement &&
        // Any target that is a menuitem, or a child of a menuitem, should close the menu
        (event.target.role === 'menuitem' || event.target.closest('[role="menuitem"]') !== null)
      ) {
        event.currentTarget.hidePopover()
      }
    },
    [onClick],
  )
}

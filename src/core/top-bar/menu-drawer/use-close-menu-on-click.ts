import { getClosestDialogElement } from '#src/utils/dialog'
import { useCallback } from 'react'

import type { MouseEventHandler } from 'react'

/**
 * By default, we will close the menu drawer whenever the dialog receives a click event from an
 * anchor descendant. We do not close the menu drawer automatically for button descendants, as
 * they may or may not want the drawer to close.
 */
export function useCloseTopBarMenuDrawerOnClick(): MouseEventHandler<HTMLDivElement> {
  return useCallback((event) => {
    // NOTE: we do NOT check if the event's default action has been prevented, because in most
    // cases, menu items will be anchor elements that _will_ prevent the default action so that
    // the product's client-side router can handle the navigation without a full-page reload.
    if (
      // We only close if the click was initiated by the user; this helps us avoid closing the drawer
      // when the click was triggered by a programmatic action, such as element.click().
      event.isTrusted &&
      event.target instanceof HTMLElement &&
      // Targets that are anchors, or children of anchors, should close the drawer
      (event.target instanceof HTMLAnchorElement || event.target.closest('a') !== null)
    ) {
      getClosestDialogElement(event.currentTarget)?.close()
    }
  }, [])
}

import { closeComboboxPopup } from './close-popup'
import { useCallback } from 'react'

import type { MouseEventHandler } from 'react'

/**
 * Creates a click handler that closes the popup when clicking an option.
 * Calls the provided onClick handler first to allow preventing the default close behavior.
 * @param onClick - Optional click handler to call before closing.
 * @returns Click handler that closes the popup on option clicks.
 */
export function useCloseComboboxPopupOnClick(
  onClick?: MouseEventHandler<HTMLDialogElement>,
): MouseEventHandler<HTMLDialogElement> {
  return useCallback(
    (event) => {
      onClick?.(event)
      if (
        !event.defaultPrevented &&
        // Only close for user-initiated clicks, not programmatic ones like element.click()
        event.isTrusted &&
        event.target instanceof HTMLElement &&
        // Close if target is an option or option descendant
        (event.target.role === 'option' || event.target.closest('[role="option"]') !== null)
      ) {
        closeComboboxPopup(event.currentTarget as HTMLDialogElement)
      }
    },
    [onClick],
  )
}

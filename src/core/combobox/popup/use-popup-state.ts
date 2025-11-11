import { useComboboxPopupObserver } from './use-popup-observer'
import { useState } from 'react'

/**
 * Tracks the open state of a popup element by subscribing to its `toggle` event.
 * @param popupId - ID of the popup element to observe.
 * @returns `true` when the popup is open, `false` when closed.
 */
export function useComboboxPopupState(popupId: string): boolean {
  const [isOpen, setIsOpen] = useState(false)

  useComboboxPopupObserver(popupId, (event) => {
    setIsOpen(event.newState === 'open')
  })

  return isOpen
}

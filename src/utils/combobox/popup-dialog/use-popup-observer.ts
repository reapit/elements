import { useEffect, useRef } from 'react'

/**
 * Observes a popup element's open state by subscribing to its `toggle` event.
 * @param popupId - ID of the popup element to observe.
 * @param callback - Callback function to be called when the popup's open state changes.
 */
export function useComboboxPopupObserver(popupId: string, callback: (event: ToggleEvent) => void): void {
  const callbackRef = useRef(callback)

  // Syncs the callback to our ref to prevent `subscribeToToggleEvent` from being invalidated
  // too often when consumers provide unstable callbacks.
  useEffect(
    function syncCallbackRef() {
      callbackRef.current = callback
    },
    [callback],
  )

  useEffect(
    function subscribeToToggleEvent() {
      const popupElement = document.getElementById(popupId)

      if (popupElement instanceof HTMLElement) {
        const abortController = new AbortController()

        popupElement.addEventListener('toggle', (event) => callbackRef.current(event), {
          signal: abortController.signal,
        })

        return () => abortController.abort()
      }
    },
    [popupId],
  )
}

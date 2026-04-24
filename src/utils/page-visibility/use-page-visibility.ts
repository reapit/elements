import { useEffect } from 'react'

/**
 * Calls `onChange` with the current `document.hidden` value whenever the
 * page visibility changes. Useful for pausing timers or animations when the
 * user switches tabs or minimises the window.
 *
 * The callback should be stable (e.g. wrapped in `useCallback`) to avoid
 * re-registering the listener on every render.
 */
export function usePageVisibility(onChange: (hidden: boolean) => void): void {
  useEffect(
    function listenForPageVisibilityChange() {
      function handleVisibilityChange() {
        onChange(document.hidden)
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      return function removePageVisibilityListener() {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    },
    [onChange],
  )
}

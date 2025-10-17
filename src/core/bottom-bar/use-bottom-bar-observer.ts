import { useEffect, useRef, useState } from 'react'
import type { BottomBarState } from './context'

/**
 * Determines if the bottom bar should be open (visible) or not based on the vertical scroll direction of
 * the specified scroll container element. If no ID is provided, the bottom bar state will always be
 * extended.
 */
export const useBottomBarObserver = (scrollContainerId: string | undefined): BottomBarState => {
  const [state, setState] = useState<BottomBarState>('extended')
  const previousScrollTopRef = useRef(0)

  useEffect(
    function listenForScrollEventOnRef() {
      if (!scrollContainerId) return

      const container = document.getElementById(scrollContainerId)
      if (!container) return

      const abortController = new AbortController()

      function handleScroll(event: Event) {
        const element = event.currentTarget
        if (element instanceof HTMLElement) {
          const scrollTopDelta = element.scrollTop - previousScrollTopRef.current
          // scrollTop increases as the user scrolls down, and decreases as they scroll up.
          // By subtracting the previous value scrollTop from the current scrollTop, the delta will
          // be positive when scrolling down and negative when scrolling up.
          //
          // The bottom bar should extend when scrolling up (negative delta) and retract when
          // scrolling down (positive delta).
          setState(scrollTopDelta < 0 ? 'extended' : 'retracted')
          previousScrollTopRef.current = element.scrollTop
        }
      }

      container.addEventListener('scroll', handleScroll, {
        signal: abortController.signal,
      })

      return () => {
        abortController.abort()
      }
    },
    [scrollContainerId],
  )

  return state
}

import { useEffect } from 'react'
import type { useSideBar } from './use-side-bar'

// Media query to detect "wide-screen" widths (1440px and above).
const mediaQuery = globalThis.matchMedia('(min-width: 1440px)')

/**
 * A simple effect that listens for changes in the match media query (min wide-screen width) and updates
 * the side bar's state accordingly.
 */
export function useSideBarMatchMediaEffect({ setState }: useSideBar.Result) {
  useEffect(
    function expandOrCollapseWhenMediaQueryChanges() {
      setState(determineSideBarStateFromViewport())

      mediaQuery.addEventListener('change', () => setState(determineSideBarStateFromViewport()))
      return () => {
        mediaQuery.removeEventListener('change', () => setState(determineSideBarStateFromViewport()))
      }
    },
    [setState],
  )
}

/** Returns which state the side bar should have based on the viewport's current size. */
export function determineSideBarStateFromViewport() {
  return mediaQuery.matches ? 'expanded' : 'collapsed'
}

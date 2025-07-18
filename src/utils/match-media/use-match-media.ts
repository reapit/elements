import { useEffect, useState } from 'react'

/**
 * A hook that tracks whether a media query condition matches.
 *
 * @param condition - The media query condition to match against (e.g., "(min-width: 1024px)")
 * @returns boolean - Whether the media query condition matches
 *
 * @example
 * ```tsx
 * const isDesktop = useMatchMedia('(min-width: 1024px)')
 * return isDesktop ? <DesktopContent /> : <MobileContent />
 * ```
 */
export function useMatchMedia(condition: string): boolean {
  const [matches, setMatches] = useState(() => globalThis.matchMedia(condition).matches)

  useEffect(
    function setupMediaQueryListener() {
      const mediaQuery = globalThis.matchMedia(condition)

      // If the condition changes, we update the state immediately
      setMatches(mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    },
    [condition],
  )

  return matches
}

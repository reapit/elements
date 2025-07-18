import { useEffect, useRef, useState } from 'react'

import type { RefObject } from 'react'

/**
 * Determines if the bottom bar should be open (visible) or not based on the vertical scroll direction of
 * the specified scroll container element.
 */
export const useBottomBarObserver = (scrollContainerRef: RefObject<HTMLElement>): boolean => {
  const [isOpen, setIsOpen] = useState(true)
  const previousTopPositionRef = useRef(0)

  useEffect(
    function listenForScrollEventOnRef() {
      if (!scrollContainerRef.current) return

      const element = scrollContainerRef.current
      const abortController = new AbortController()

      function handleScroll(event: Event) {
        const element = event.target as HTMLElement
        setIsOpen(previousTopPositionRef.current > element.scrollTop)
        previousTopPositionRef.current = element.scrollTop
      }

      element.addEventListener('scroll', handleScroll, {
        signal: abortController.signal,
      })

      return () => {
        abortController.abort()
      }
    },
    [scrollContainerRef],
  )

  return isOpen
}

import { useEffect, useRef, useState } from 'react'
import { calculateScrollState } from './calculate-scroll-state'

export namespace useScrollObserver {
  export interface Result {
    /**
     * Whether the container can scroll left (has content before current view)
     */
    canScrollLeft: boolean
    /**
     * Whether the container can scroll right (has content after current view)
     */
    canScrollRight: boolean
  }
}

/**
 * Observes the scroll state of a container and returns information about the current scroll position.
 *
 * The hook provides flags to determine if scrolling is possible in each direction.
 *
 * @param containerId - ID of the scrollable container element
 * @returns Object containing scroll capability flags
 *
 * @example
 * ```tsx
 * const { canScrollLeft, canScrollRight } = useScrollObserver('carousel-container')
 *
 * return (
 *   <div>
 *     <button disabled={!canScrollLeft}>Previous</button>
 *     <div id="carousel-container">{content}</div>
 *     <button disabled={!canScrollRight}>Next</button>
 *   </div>
 * )
 * ```
 */
export function useScrollObserver(containerId: string): useScrollObserver.Result {
  const [result, setResult] = useState<useScrollObserver.Result>({
    canScrollLeft: false,
    canScrollRight: false,
  })

  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const element = document.getElementById(containerId)
    if (!element) return

    function updateScrollState() {
      // Cancel any pending animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Use requestAnimationFrame to batch updates and avoid layout thrashing
      animationFrameRef.current = requestAnimationFrame(() => {
        if (element) {
          setResult(
            calculateScrollState({
              scrollLeft: element.scrollLeft,
              scrollWidth: element.scrollWidth,
              clientWidth: element.clientWidth,
            }),
          )
        }
      })
    }

    // Set initial state
    updateScrollState()

    // Create abort controller for event listeners
    const abortController = new AbortController()

    // Listen for scroll events
    element.addEventListener('scroll', updateScrollState, {
      signal: abortController.signal,
      passive: true,
    })

    // Listen for resize events on the window to handle container size changes
    window.addEventListener('resize', updateScrollState, {
      signal: abortController.signal,
      passive: true,
    })

    // Use ResizeObserver to detect when the element's size changes
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(element)

    // Use MutationObserver to detect when children are added/removed (affects scroll width)
    const mutationObserver = new MutationObserver(updateScrollState)
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    })

    return () => {
      abortController.abort()
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [containerId])

  return result
}

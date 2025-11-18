import type { useScrollObserver } from './use-scroll-observer'

export namespace calculateScrollState {
  export interface Input {
    /** Current horizontal scroll position */
    scrollLeft: number
    /** Total scrollable width of the element */
    scrollWidth: number
    /** Visible width of the element */
    clientWidth: number
  }
}

/**
 * Small epsilon value to account for sub-pixel rounding in scroll calculations.
 * This handles floating-point precision issues in browser scroll APIs.
 */
const SCROLL_EPSILON = 0.1

/**
 * Calculates the scroll state of a container based on its scroll dimensions.
 *
 * @param input - Object containing scroll metrics from an HTMLElement
 * @returns Object containing scroll position state and scroll capability flags
 *
 * @example
 * ```typescript
 * const state = calculateScrollState({
 *   scrollLeft: element.scrollLeft,
 *   scrollWidth: element.scrollWidth,
 *   clientWidth: element.clientWidth,
 * })
 * ```
 */
export function calculateScrollState(input: calculateScrollState.Input): useScrollObserver.Result {
  const { scrollLeft, scrollWidth, clientWidth } = input

  // Maximum scroll position (accounting for rounding errors)
  const maxScrollLeft = scrollWidth - clientWidth
  const canScroll = maxScrollLeft > 0

  // Check if we're at the start or end (accounting for sub-pixel rounding)
  const isAtStart = scrollLeft < SCROLL_EPSILON
  const isAtEnd = scrollLeft > maxScrollLeft - SCROLL_EPSILON

  return {
    canScrollLeft: canScroll && !isAtStart,
    canScrollRight: canScroll && !isAtEnd,
  }
}

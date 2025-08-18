import { BreakpointMinimumDimensions } from './breakpoints'

import type { Breakpoint } from './breakpoints'

/**
 * Returns a width condition that matches when the width is greater than or equal to the minimum width of the given
 * breakpoint.
 *
 * @param breakpoint - The breakpoint to match against.
 * @returns A condition that can be used with media or container queries.
 */
export function isWidthAtOrAbove(breakpoint: Breakpoint) {
  return `(width >= ${BreakpointMinimumDimensions[breakpoint]})`
}

/**
 * Returns a width condition that matches when the width is strictly less than the minimum width of the given
 * breakpoint.
 *
 * @param breakpoint - The breakpoint to match against.
 * @returns A condition that can be used with media or container queries.
 */
export function isWidthBelow(breakpoint: Breakpoint) {
  return `(width < ${BreakpointMinimumDimensions[breakpoint]})`
}

import { BreakpointMinimumDimensions } from '../breakpoints'
import { isWidthAtOrAbove, isWidthBelow } from '../conditions'

import type { Breakpoint } from '../breakpoints'

const breakpoints = Object.keys(BreakpointMinimumDimensions).sort() as Breakpoint[]

test.each(breakpoints)('isWidthAtOrAbove("%s")', (bp) => {
  expect(isWidthAtOrAbove(bp)).toBe(`(width >= ${BreakpointMinimumDimensions[bp]})`)
})

test.each(breakpoints)('isWidthBelow("%s")', (bp) => {
  expect(isWidthBelow(bp)).toBe(`(width < ${BreakpointMinimumDimensions[bp]})`)
})

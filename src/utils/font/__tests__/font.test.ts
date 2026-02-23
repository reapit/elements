import { test, expect } from 'vitest'
import { font } from '../font'
import { fontSizes, fontWeights } from '../types'

const testCases = fontSizes.flatMap((size) => fontWeights.map((weight) => [size, weight] as const))

test.each(testCases)('font(%s, %s) returns correct CSS', (size, weight) => {
  expect(font(size, weight)).toMatchSnapshot()
})

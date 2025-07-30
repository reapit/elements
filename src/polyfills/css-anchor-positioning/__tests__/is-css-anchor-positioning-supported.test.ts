import { isCSSAnchorPositioningSupported } from '../is-css-anchor-positioning-supported'

afterEach(() => {
  vi.unstubAllGlobals()
})

test('returns true when CSS anchor positioning is supported', () => {
  vi.stubGlobal('CSS', { supports: () => true })
  expect(isCSSAnchorPositioningSupported()).toBe(true)
})

test('returns false when CSS anchor positioning is NOT supported', () => {
  vi.stubGlobal('CSS', { supports: () => false })
  expect(isCSSAnchorPositioningSupported()).toBe(false)
})

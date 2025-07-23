import { isCSSAnchorPositioningSupported } from '../is-css-anchor-positioning-supported'

test('returns true when CSS anchor positioning is supported', () => {
  Object.defineProperty(document.documentElement.style, 'anchorName', {
    value: '',
    configurable: true,
  })
  expect(isCSSAnchorPositioningSupported()).toBe(true)
})

test('returns false when CSS anchor positioning is NOT supported', () => {
  delete (document.documentElement.style as any).anchorName
  expect(isCSSAnchorPositioningSupported()).toBe(false)
})

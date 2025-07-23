import { applyCSSAnchorPositioningPolyfill } from '../polyfill'
import { isCSSAnchorPositioningSupported } from '../is-css-anchor-positioning-supported'
import polyfill from '@oddbird/css-anchor-positioning/fn'

vi.mock('@oddbird/css-anchor-positioning/fn')
vi.mock('../is-css-anchor-positioning-supported')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('when CSS anchor positioning is not supported', () => {
  beforeEach(() => {
    vi.mocked(isCSSAnchorPositioningSupported).mockReturnValue(false)
  })

  test('applies the polyfill', async () => {
    await applyCSSAnchorPositioningPolyfill()
    expect(polyfill).toHaveBeenCalledOnce()
  })

  test('by default, does not polyfill eligible inline styles for all elements in the document', async () => {
    await applyCSSAnchorPositioningPolyfill()
    expect(polyfill).toHaveBeenCalledWith(
      expect.objectContaining({
        excludeInlineStyles: true,
      }),
    )
  })

  test('by default, does not calculate position for each animation frame', async () => {
    await applyCSSAnchorPositioningPolyfill()
    expect(polyfill).toHaveBeenCalledWith(
      expect.objectContaining({
        useAnimationFrame: false,
      }),
    )
  })

  test('allows default options to be overridden', async () => {
    const testElement = document.createElement('div')
    await applyCSSAnchorPositioningPolyfill({
      elements: [testElement],
      excludeInlineStyles: false,
      useAnimationFrame: true,
    })
    expect(polyfill).toHaveBeenCalledWith({
      elements: [testElement],
      excludeInlineStyles: false,
      useAnimationFrame: true,
    })
    testElement.remove()
  })
})

describe('when CSS anchor positioning is supported', () => {
  beforeEach(() => {
    vi.mocked(isCSSAnchorPositioningSupported).mockReturnValue(true)
  })

  test('does NOT apply the polyfill', async () => {
    await applyCSSAnchorPositioningPolyfill()
    expect(polyfill).not.toHaveBeenCalled()
  })
})

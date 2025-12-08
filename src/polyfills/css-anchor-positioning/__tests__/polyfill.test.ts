import { applyCSSAnchorPositioningPolyfill } from '../polyfill'
import { isCSSAnchorPositioningSupported } from '../is-css-anchor-positioning-supported'
import { polyfill } from '../preload'

vi.mock('../is-css-anchor-positioning-supported')
vi.mock('../preload', () => ({
  polyfill: vi.fn(),
}))

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
    document.body.appendChild(testElement)
    await applyCSSAnchorPositioningPolyfill({
      elements: [testElement],
      excludeInlineStyles: false,
      useAnimationFrame: true,
    })
    expect(polyfill).toHaveBeenCalledOnce()
    expect(polyfill).toHaveBeenCalledWith({
      elements: [testElement],
      excludeInlineStyles: false,
      useAnimationFrame: true,
    })
    testElement.remove()
  })

  test('filters out disconnected elements before applying polyfill', async () => {
    const connectedElement = document.createElement('div')
    const disconnectedElement = document.createElement('div')
    document.body.appendChild(connectedElement)

    await applyCSSAnchorPositioningPolyfill({
      elements: [connectedElement, disconnectedElement],
    })

    expect(polyfill).toHaveBeenCalledWith({
      elements: [connectedElement],
      excludeInlineStyles: true,
      useAnimationFrame: false,
    })

    connectedElement.remove()
  })

  test('does not apply polyfill if all elements are disconnected', async () => {
    const disconnectedElement1 = document.createElement('div')
    const disconnectedElement2 = document.createElement('div')

    await applyCSSAnchorPositioningPolyfill({
      elements: [disconnectedElement1, disconnectedElement2],
    })

    expect(polyfill).not.toHaveBeenCalled()
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

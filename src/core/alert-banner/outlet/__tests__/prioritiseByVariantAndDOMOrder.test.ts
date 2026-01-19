import { prioritiseByVariantAndDOMOrder } from '../prioritiseByVariantAndDOMOrder'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('prioritiseByVariantAndDOMOrder', () => {
  test('returns null when no banners are provided', () => {
    const result = prioritiseByVariantAndDOMOrder([])
    expect(result).toBeNull()
  })

  test('returns the only banner when single banner is provided', () => {
    const banner = createMockBanner('info', 'banner1')
    const result = prioritiseByVariantAndDOMOrder([banner])
    expect(result).toBe(banner)
  })

  test('prioritizes error over warning and info', () => {
    const infoBanner = createMockBanner('info', 'info')
    const warningBanner = createMockBanner('warning', 'warning')
    const errorBanner = createMockBanner('error', 'error')

    const result = prioritiseByVariantAndDOMOrder([infoBanner, warningBanner, errorBanner])
    expect(result).toBe(errorBanner)
  })

  test('prioritizes warning over info', () => {
    const infoBanner = createMockBanner('info', 'info')
    const warningBanner = createMockBanner('warning', 'warning')

    const result = prioritiseByVariantAndDOMOrder([infoBanner, warningBanner])
    expect(result).toBe(warningBanner)
  })

  test('returns last banner when same priority (last wins)', () => {
    const firstInfo = createMockBanner('info', 'first')
    const secondInfo = createMockBanner('info', 'second')

    const result = prioritiseByVariantAndDOMOrder([firstInfo, secondInfo])
    expect(result).toBe(secondInfo)
  })

  test('handles mixed variants with same priority correctly (last wins)', () => {
    const firstWarning = createMockBanner('warning', 'first-warning')
    const secondWarning = createMockBanner('warning', 'second-warning')

    const result = prioritiseByVariantAndDOMOrder([firstWarning, secondWarning])
    expect(result).toBe(secondWarning)
  })

  test('returns highest priority regardless of order', () => {
    const infoBanner = createMockBanner('info', 'info')
    const errorBanner = createMockBanner('error', 'error')
    const warningBanner = createMockBanner('warning', 'warning')

    // Error in middle should still win
    const result = prioritiseByVariantAndDOMOrder([infoBanner, errorBanner, warningBanner])
    expect(result).toBe(errorBanner)
  })

  test('handles banners with no variant attribute', () => {
    const noVariantBanner = document.createElement('div')
    noVariantBanner.id = 'no-variant'
    const infoBanner = createMockBanner('info', 'info')

    const result = prioritiseByVariantAndDOMOrder([noVariantBanner, infoBanner])
    expect(result).toBe(infoBanner)
  })

  test('returns null when all banners have no variant', () => {
    const banner1 = document.createElement('div')
    banner1.id = 'banner1'
    const banner2 = document.createElement('div')
    banner2.id = 'banner2'

    const result = prioritiseByVariantAndDOMOrder([banner1, banner2])
    expect(result).toBeNull() // No valid variants return null
  })

  test('optimizes for early termination with error banner', () => {
    const errorBanner = createMockBanner('error', 'error')
    const infoBanner = createMockBanner('info', 'info')
    const warningBanner = createMockBanner('warning', 'warning')

    // Error at end should be found and returned immediately
    const result = prioritiseByVariantAndDOMOrder([infoBanner, warningBanner, errorBanner])
    expect(result).toBe(errorBanner)
  })

  test('handles complex scenario with multiple variants and ordering', () => {
    const banners = [
      createMockBanner('info', 'info1'),
      createMockBanner('warning', 'warning1'),
      createMockBanner('info', 'info2'),
      createMockBanner('error', 'error1'),
      createMockBanner('warning', 'warning2'),
    ]

    const result = prioritiseByVariantAndDOMOrder(banners)
    expect(result).toBe(banners[3]) // error1 should win
  })

  test('handles invalid variant values gracefully', () => {
    const invalidBanner = document.createElement('div')
    invalidBanner.setAttribute('data-variant', 'invalid')
    invalidBanner.id = 'invalid'
    const infoBanner = createMockBanner('info', 'info')

    const result = prioritiseByVariantAndDOMOrder([invalidBanner, infoBanner])
    expect(result).toBe(infoBanner)
  })
})

function createMockBanner(variant: string, id: string): HTMLElement {
  const banner = document.createElement('div')
  banner.setAttribute('data-variant', variant)
  banner.id = id
  return banner
}

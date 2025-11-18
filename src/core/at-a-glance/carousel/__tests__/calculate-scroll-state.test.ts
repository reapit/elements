import { calculateScrollState } from '../calculate-scroll-state'

test('returns start position when scrollLeft is 0', () => {
  const result = calculateScrollState({
    scrollLeft: 0,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
  expect(result.canScrollRight).toBe(true)
})

test('returns end position when scrolled to the end', () => {
  const result = calculateScrollState({
    scrollLeft: 100,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(false)
})

test('returns middle position when scrolled partway through', () => {
  const result = calculateScrollState({
    scrollLeft: 50,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(true)
})

test('returns start position when content does not overflow', () => {
  const result = calculateScrollState({
    scrollLeft: 0,
    scrollWidth: 100,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
  expect(result.canScrollRight).toBe(false)
})

test('returns start position when content is smaller than container', () => {
  const result = calculateScrollState({
    scrollLeft: 0,
    scrollWidth: 50,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
  expect(result.canScrollRight).toBe(false)
})

test('handles sub-pixel values near start', () => {
  const result = calculateScrollState({
    scrollLeft: 0.05,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
  expect(result.canScrollRight).toBe(true)
})

test('handles sub-pixel values near end', () => {
  const result = calculateScrollState({
    scrollLeft: 99.95,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(false)
})

test('treats position just past epsilon as middle', () => {
  const result = calculateScrollState({
    scrollLeft: 0.15,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(true)
})

test('treats position just before end epsilon as middle', () => {
  const result = calculateScrollState({
    scrollLeft: 99.85,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(true)
})

test('handles fractional scroll values', () => {
  const result = calculateScrollState({
    scrollLeft: 50.5,
    scrollWidth: 200.7,
    clientWidth: 100.3,
  })

  expect(result.canScrollLeft).toBe(true)
  expect(result.canScrollRight).toBe(true)
})

test('handles negative scrollLeft values', () => {
  const result = calculateScrollState({
    scrollLeft: -0.05,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
})

test('handles scrollLeft slightly exceeding maximum scroll position', () => {
  const result = calculateScrollState({
    scrollLeft: 100.05,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollRight).toBe(false)
})

test('accounts for browser rounding errors at start boundary', () => {
  const result = calculateScrollState({
    scrollLeft: 0.09,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollLeft).toBe(false)
})

test('accounts for browser rounding errors at end boundary', () => {
  const result = calculateScrollState({
    scrollLeft: 99.91,
    scrollWidth: 200,
    clientWidth: 100,
  })

  expect(result.canScrollRight).toBe(false)
})

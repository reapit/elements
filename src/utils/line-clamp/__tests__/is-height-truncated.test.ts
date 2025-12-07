import { isHeightTruncated } from '../is-height-truncated'

afterEach(() => {
  document.body.innerHTML = ''
})

test('returns false when element is null', () => {
  expect(isHeightTruncated(null)).toBe(false)
})

test('returns false when scrollHeight equals clientHeight', () => {
  const element = createElementWithHeights(100, 100)
  expect(isHeightTruncated(element)).toBe(false)
})

test('returns false when scrollHeight is less than clientHeight', () => {
  const element = createElementWithHeights(80, 100)
  expect(isHeightTruncated(element)).toBe(false)
})

test('returns true when scrollHeight exceeds clientHeight', () => {
  const element = createElementWithHeights(150, 100)
  expect(isHeightTruncated(element)).toBe(true)
})

test('returns true when scrollHeight is much larger than clientHeight', () => {
  const element = createElementWithHeights(500, 100)
  expect(isHeightTruncated(element)).toBe(true)
})

test('returns true when scrollHeight exceeds clientHeight by 1 pixel', () => {
  const element = createElementWithHeights(101, 100)
  expect(isHeightTruncated(element)).toBe(true)
})

function createElementWithHeights(scrollHeight: number, clientHeight: number): HTMLElement {
  const element = document.createElement('div')

  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  })

  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  })

  document.body.appendChild(element)
  return element
}

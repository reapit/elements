import { getARIALabel } from '../get-aria-label'

test('returns "Page 1" when page number is 1 and variant is "previous-page"', () => {
  expect(getARIALabel('previous-page', 1, 10)).toBe('Page 1')
})

test('returns "Page 1" when page number is 2 and variant is "previous-page"', () => {
  expect(getARIALabel('previous-page', 2, 10)).toBe('Page 1')
})

test('returns "Page 5" when page number is 6 and variant is "previous-page"', () => {
  expect(getARIALabel('previous-page', 6, 10)).toBe('Page 5')
})

test('returns "Page 5" when page number is 4 and variant is "next-page"', () => {
  expect(getARIALabel('next-page', 4, 10)).toBe('Page 5')
})

test('returns "Page 10" when page number is 10 and variant is "next-page"', () => {
  expect(getARIALabel('next-page', 10, 10)).toBe('Page 10')
})

test('returns "Page 10" when page number is 10 and variant is "next-page"', () => {
  expect(getARIALabel('next-page', 10, 10)).toBe('Page 10')
})

import { isTerminalPage } from '../is-terminal-page'

test('returns true when page number is 1 and variant is "previous-page"', () => {
  expect(isTerminalPage('previous-page', 1, 10)).toBe(true)
})

test('returns true when page number equals page count and variant is "next-page"', () => {
  expect(isTerminalPage('next-page', 10, 10)).toBe(true)
})

test('returns false when page number is exclusively in the range `(1, pageCount)`', () => {
  expect(isTerminalPage('previous-page', 5, 10)).toBe(false)
  expect(isTerminalPage('next-page', 5, 10)).toBe(false)
})

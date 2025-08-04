import { normalisePath } from '../normalise-path'

test('preserves empty string', () => {
  expect(normalisePath('')).toBe('')
})

test('preserves root path', () => {
  expect(normalisePath('/')).toBe('/')
})

test('leaves paths without trailing slash unchanged', () => {
  expect(normalisePath('/users')).toBe('/users')
  expect(normalisePath('/users/123')).toBe('/users/123')
})

test('removes single trailing slash non-root paths', () => {
  expect(normalisePath('/users/')).toBe('/users')
  expect(normalisePath('/users/123/')).toBe('/users/123')
})

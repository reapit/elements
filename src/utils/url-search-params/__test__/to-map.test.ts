import { toMap } from '../to-map'

test('returns a Map instance', () => {
  const params = new URLSearchParams()
  const map = toMap(params)
  expect(map).toBeInstanceOf(Map)
})

test('Map is empty when URLSearchParams is empty', () => {
  const params = new URLSearchParams()
  const map = toMap(params)
  expect(map.size).toBe(0)
})

test('Map has the same key-value pairs as the URLSearchParams', () => {
  const params = new URLSearchParams('foo=bar&baz=qux')
  const map = toMap(params)
  expect(map.get('foo')).toBe('bar')
  expect(map.get('baz')).toBe('qux')
})

test('Map has entries for empty search params', () => {
  const params = new URLSearchParams('a=')
  const map = toMap(params)
  expect(map.get('a')).toBe('')
})

test('Map has an array of values for a key when that key is used by multiple search params', () => {
  const params = new URLSearchParams('foo=&foo=1&foo=1&foo=2')
  const map = toMap(params)
  expect(map.get('foo')).toEqual(['', '1', '1', '2'])
})

test('Map keys are sorted alphabetically', () => {
  const params = new URLSearchParams('b=2&a=1&c=3')
  const map = toMap(params)
  expect(Array.from(map.keys())).toEqual(['a', 'b', 'c'])
})

import { toURLSearchParams } from '../to-url-search-params'

test('returns a URLSearchParams instance', () => {
  const data = { a: '1' }
  const params = toURLSearchParams(Object.entries(data))

  expect(params).toBeInstanceOf(URLSearchParams)
})

test('URLSearchParams is empty when input is empty', () => {
  const data = {}
  const params = toURLSearchParams(Object.entries(data))

  expect(params.toString()).toBe('')
})

test('converts simple key-value pairs', () => {
  const data = { foo: 'bar', baz: 'qux' }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.get('foo')).toBe('bar')
  expect(params.get('baz')).toBe('qux')
  expect(params.toString()).toBe('baz=qux&foo=bar')
})

test('removes pairs with null values', () => {
  const data = { a: '1', b: null, c: '3' }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.has('b')).toBe(false)
  expect(params.toString()).toBe('a=1&c=3')
})

test('expands array values into multiple key-value pairs', () => {
  const data = { a: ['1', '2'], b: '3' }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.getAll('a')).toEqual(['1', '2'])
  expect(params.get('b')).toBe('3')
  expect(params.toString()).toBe('a=1&a=2&b=3')
})

test('handles empty string values', () => {
  const data = { a: '', b: '2' }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.get('a')).toBe('')
  expect(params.get('b')).toBe('2')
  expect(params.toString()).toBe('a=&b=2')
})

test('sorts entries alphabetically', () => {
  const data = { b: '2', a: '1', c: '3' }
  const params = toURLSearchParams(Object.entries(data))

  expect(Array.from(params.keys())).toEqual(['a', 'b', 'c'])
  expect(params.toString()).toBe('a=1&b=2&c=3')
})

test('replaces existing keys from init', () => {
  const data = { a: '1', b: null }
  const init = new URLSearchParams('a=5&b=6&c=7')

  const params = toURLSearchParams(Object.entries(data), init)

  expect(params.get('a')).toBe('1')
  expect(params.has('b')).toBe(false)
  expect(params.get('c')).toBe('7')
  expect(params.toString()).toBe('a=1&c=7')
})

test('appends array values and replaces existing keys from init', () => {
  const data = { a: ['1', '2'], b: null }
  const init = new URLSearchParams('a=5&b=6&c=7')

  const params = toURLSearchParams(Object.entries(data), init)

  expect(params.getAll('a')).toEqual(['1', '2'])
  expect(params.has('b')).toBe(false)
  expect(params.get('c')).toBe('7')
  expect(params.toString()).toBe('a=1&a=2&c=7')
})

test('handles input with only null values', () => {
  const data = { a: null, b: null }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.toString()).toBe('')
})

test('handles input with array containing empty strings', () => {
  const data = { a: ['', '1', ''] }
  const params = toURLSearchParams(Object.entries(data))

  expect(params.getAll('a')).toEqual(['', '1', ''])
  expect(params.toString()).toBe('a=&a=1&a=')
})

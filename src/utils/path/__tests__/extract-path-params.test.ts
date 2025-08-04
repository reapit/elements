import { extractPathParams } from '../extract-path-params'

test('returns null when pattern does not match pathname', () => {
  const params = extractPathParams('/users', '/users/extra')

  expect(params).toBeNull()
  // NOTE: our types can't tell if we'll have a match or not, but they
  // can tell what shape the params will have if there is a match
  expectTypeOf(params).toEqualTypeOf<{} | null>()
})

test('returns empty object when pattern matches pathname but there are no params', () => {
  const params = extractPathParams('/about', '/about')

  expect(params).toEqual({})
  expectTypeOf(params).toEqualTypeOf<{} | null>()
})

test('extracts single path parameter', () => {
  const params = extractPathParams('/users/:userId', '/users/abc-123')

  expect(params).toEqual({ userId: 'abc-123' })
  expectTypeOf(params).toEqualTypeOf<{ userId: string } | null>()
})

test('extracts multiple path parameters', () => {
  const params = extractPathParams('/users/:userId/posts/:postId', '/users/123/posts/456')

  expect(params).toEqual({ userId: '123', postId: '456' })
  expectTypeOf(params).toEqualTypeOf<{ userId: string; postId: string } | null>()
})

test('extracts splat parameter', () => {
  const params = extractPathParams('/*', '/path/to/a resource') // space is permitted

  expect(params).toEqual({ '*': 'path/to/a resource' })
  expectTypeOf(params).toEqualTypeOf<{ '*': string } | null>()
})

test('extracts combined path parameters and splat', () => {
  const params = extractPathParams('/:category/*', '/docs/guides/getting-started')

  expect(params).toEqual({ category: 'docs', '*': 'guides/getting-started' })
  expectTypeOf(params).toEqualTypeOf<{ category: string; '*': string } | null>()
})

test('handles special characters in parameter values', () => {
  expect(extractPathParams('/users/:id', '/users/user_123')).toEqual({ id: 'user_123' })
  expect(extractPathParams('/users/:id', '/users/user-123')).toEqual({ id: 'user-123' })
  expect(extractPathParams('/users/:id', '/users/user.123')).toEqual({ id: 'user.123' })
  expect(extractPathParams('/search/:query', '/search/hello world')).toEqual({ query: 'hello world' })
})

test('handles empty splat parameter', () => {
  expect(extractPathParams('/files/*', '/files/')).toEqual({ '*': '' })
  expect(extractPathParams('/users/:id/*', '/users/123/')).toEqual({
    id: '123',
    '*': '',
  })
})

test('is case insensitive for pattern matching', () => {
  expect(extractPathParams('/Users/:ID', '/users/123')).toEqual({ ID: '123' })
  expect(extractPathParams('/api/V1/users/:id', '/API/v1/USERS/456')).toEqual({ id: '456' })
})

test('handles root path and empty string matches', () => {
  expect(extractPathParams('/', '/')).toEqual({})
  expect(extractPathParams('', '')).toEqual({})
})

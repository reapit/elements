import { matchPath } from '../match-path'

test('returns null when pattern does not match pathname', () => {
  const result = matchPath('/a', '/b')

  expect(result).toBeNull()
  expectTypeOf(result).toEqualTypeOf<{ params: {}; pathname: string; pattern: string } | null>()
})

test('returns match object when pattern matches pathname with no params', () => {
  const result = matchPath('/a', '/a')

  expect(result).toEqual({
    params: {},
    pathname: '/a',
    pattern: '/a',
  })
  expectTypeOf(result).toEqualTypeOf<{ params: {}; pathname: string; pattern: string } | null>()
})

test('returns null when required parameter is missing', () => {
  const result = matchPath('/a/:b', '/a')

  expect(result).toBeNull()
  expectTypeOf(result).toEqualTypeOf<{ params: { b: string }; pathname: string; pattern: string } | null>()
})

test('extracts single path parameter', () => {
  const result = matchPath('/a/:b', '/a/abc123')

  expect(result).toEqual({
    params: { b: 'abc123' },
    pathname: '/a/abc123',
    pattern: '/a/:b',
  })
  expectTypeOf(result).toEqualTypeOf<{ params: { b: string }; pathname: string; pattern: string } | null>()
})

test('extracts splat parameter with empty value', () => {
  const result = matchPath('/a/*', '/a')

  expect(result).toEqual({
    params: { '*': '' },
    pathname: '/a',
    pattern: '/a/*',
  })
  expectTypeOf(result).toEqualTypeOf<{ params: { '*': string }; pathname: string; pattern: string } | null>()
})

test('extracts splat parameter with value', () => {
  const result = matchPath('/a/*', '/a/edit')

  expect(result).toEqual({
    params: { '*': 'edit' },
    pathname: '/a/edit',
    pattern: '/a/*',
  })
  expectTypeOf(result).toEqualTypeOf<{ params: { '*': string }; pathname: string; pattern: string } | null>()
})

test('extracts multiple path parameters', () => {
  const result = matchPath('/users/:userId/posts/:postId', '/users/123/posts/456')

  expect(result).toEqual({
    params: { userId: '123', postId: '456' },
    pathname: '/users/123/posts/456',
    pattern: '/users/:userId/posts/:postId',
  })
  expectTypeOf(result).toEqualTypeOf<{
    params: { userId: string; postId: string }
    pathname: string
    pattern: string
  } | null>()
})

test('extracts combined path parameters and splat', () => {
  const result = matchPath('/:category/*', '/docs/guides/getting-started')

  expect(result).toEqual({
    params: { category: 'docs', '*': 'guides/getting-started' },
    pathname: '/docs/guides/getting-started',
    pattern: '/:category/*',
  })
  expectTypeOf(result).toEqualTypeOf<{
    params: { category: string; '*': string }
    pathname: string
    pattern: string
  } | null>()
})

test('normalizes trailing slashes in both pattern and pathname', () => {
  const result = matchPath('/users/', '/users/')

  expect(result).toEqual({
    params: {},
    pathname: '/users',
    pattern: '/users',
  })
})

test('normalizes trailing slashes with parameters', () => {
  const result = matchPath('/users/:id/', '/users/123/')

  expect(result).toEqual({
    params: { id: '123' },
    pathname: '/users/123',
    pattern: '/users/:id',
  })
  expectTypeOf(result).toEqualTypeOf<{ params: { id: string }; pathname: string; pattern: string } | null>()
})

test('handles root path matching', () => {
  const result = matchPath('/', '/')

  expect(result).toEqual({
    params: {},
    pathname: '/',
    pattern: '/',
  })
})

test('handles empty string patterns and pathnames', () => {
  const result = matchPath('', '')

  expect(result).toEqual({
    params: {},
    pathname: '',
    pattern: '',
  })
})

test('handles special characters in parameter values', () => {
  const result = matchPath('/search/:query', '/search/hello world')

  expect(result).toEqual({
    params: { query: 'hello world' },
    pathname: '/search/hello world',
    pattern: '/search/:query',
  })
})

test('handles complex splat paths', () => {
  const result = matchPath('/files/*', '/files/docs/readme.txt')

  expect(result).toEqual({
    params: { '*': 'docs/readme.txt' },
    pathname: '/files/docs/readme.txt',
    pattern: '/files/*',
  })
})

test('handles case insensitive matching', () => {
  const result = matchPath('/API/:version/Users/:id', '/api/v1/users/123')

  expect(result).toEqual({
    params: { version: 'v1', id: '123' },
    pathname: '/api/v1/users/123',
    pattern: '/API/:version/Users/:id',
  })
})

test('returns null for patterns longer than pathname', () => {
  const result = matchPath('/users/:id/posts', '/users/123')

  expect(result).toBeNull()
})

test('returns null for mismatched static segments', () => {
  const result = matchPath('/users/:id', '/posts/123')

  expect(result).toBeNull()
})

test('handles trailing slash differences correctly', () => {
  expect(matchPath('/users', '/users/')).toEqual({
    params: {},
    pathname: '/users',
    pattern: '/users',
  })

  expect(matchPath('/users/', '/users')).toEqual({
    params: {},
    pathname: '/users',
    pattern: '/users',
  })
})

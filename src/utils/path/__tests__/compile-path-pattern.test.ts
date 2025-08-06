import { compilePathPattern } from '../compile-path-pattern'

test('compiles and matches static paths', () => {
  const regex = compilePathPattern('/api/v1/users')
  expect(regex.test('/api/v1/users')).toBe(true)
  expect(regex.test('/api/v2/users')).toBe(false)
  expect(regex.test('/api/v1/users/extra')).toBe(false) // exact match required
})

test('compiles and matches single path parameter', () => {
  const regex = compilePathPattern('/users/:id')

  const match = '/users/123'.match(regex)
  expect(match?.groups?.id).toBe('123')

  expect(regex.test('/users/abc_123')).toBe(true) // underscores allowed
  expect(regex.test('/users/abc-def')).toBe(true) // hyphens allowed
  expect(regex.test('/users/user.123')).toBe(true) // dots allowed
  expect(regex.test('/users/hello world')).toBe(true) // spaces allowed
  expect(regex.test('/users/user/extra')).toBe(false) // forward slashes not allowed (path separator)
})

test('compiles and matches multiple path parameters', () => {
  const regex = compilePathPattern('/users/:userId/posts/:postId')

  const match = '/users/abc-123/posts/456'.match(regex)
  expect(match?.groups?.userId).toBe('abc-123')
  expect(match?.groups?.postId).toBe('456')
})

test('compiles and matches leading splat parameter', () => {
  const regex1 = compilePathPattern('*/files') // should only match paths ending with "/files"

  expect(regex1.exec('/files')?.[1]).toBe('/')
  expect(regex1.exec('/my/path/to/some/files')?.[1]).toBe('/my/path/to/some/')
  expect(regex1.test('/my/path/to/some/files/and/things')).toBe(false)

  const regex2 = compilePathPattern('*/') // should match any path

  expect(regex2.test('')).toBe(false)
  expect(regex2.exec('/')?.[1]).toBe('/')
  expect(regex2.exec('/my/path/to/some/files')?.[1]).toBe('/my/path/to/some/files')
})

test('compiles and matches trailing splat parameter', () => {
  const regex = compilePathPattern('/files/*')

  expect(regex.exec('/files/docs/readme.txt')?.[1]).toBe('docs/readme.txt')
  expect(regex.exec('/files/')?.[1]).toBe('') // empty remaining path
  expect(regex.exec('/files')?.[1]).toBe('') // empty remaining path
})

test('compiles and matches combined path parameter and splat', () => {
  const regex = compilePathPattern('/users/:id/*')

  const match = '/users/123/posts/456/comments'.match(regex)
  expect(match?.groups?.id).toBe('123')
  expect(match?.at(-1)).toBe('posts/456/comments')
})

test('handles root path correctly', () => {
  const regex = compilePathPattern('/')
  expect(regex.test('/')).toBe(true)
  expect(regex.test('/users')).toBe(false)
  expect(regex.test('')).toBe(false)
})

test('handles empty pattern', () => {
  const regex = compilePathPattern('')
  expect(regex.test('')).toBe(true)
  expect(regex.test('/')).toBe(false)
})

test('is case insensitive', () => {
  const regex = compilePathPattern('/Users/:ID')
  expect(regex.test('/users/123')).toBe(true)
  expect(regex.test('/USERS/abc')).toBe(true)
})

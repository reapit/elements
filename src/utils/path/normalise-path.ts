/**
 * Regular expression for matching trailing slashes.
 */
const TRAILING_SLASH_REGEX = /\/$/

/**
 * The root path constant.
 */
const ROOT_PATH = '/'

/**
 * Normalizes a path by removing trailing slashes, except for the root path.
 *
 * This function ensures consistent path formatting across the application by:
 * - Preserving the root path "/" as-is
 * - Removing trailing slashes from all other paths
 *
 * @param path The path to normalize
 * @returns The normalized path
 *
 * @example
 * ```ts
 * normalisePath('/') // => '/'
 * normalisePath('/users/') // => '/users'
 * normalisePath('/users/123/') // => '/users/123'
 * normalisePath('/users') // => '/users'
 * normalisePath('/api/v1/posts/') // => '/api/v1/posts'
 * ```
 */
export function normalisePath(path: string): string {
  return path === ROOT_PATH ? path : path.replace(TRAILING_SLASH_REGEX, '')
}

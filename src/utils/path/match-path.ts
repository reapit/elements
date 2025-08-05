import { extractPathParams } from './extract-path-params'
import { normalisePath } from './normalise-path'

import type { PathParams } from './extract-path-params'

export interface PathMatch<PathParams> {
  params: PathParams
  pathname: string
  pattern: string
}

/**
 * Matches `pattern` against `pathname` and, if successful, returns the parameters specified
 * by the pattern, if any. Trailing slashes in both the pattern and the pathname are ignored.
 * Optional parameters in the pattern are not supported.
 *
 * @param pattern a pattern describing the path and, optionally, any path parameters it may include.
 * @param pathname the current pathname to match the pattern against
 *
 * @example
 * ```ts
 * matchPath('/a', '/b') // => null
 * matchPath('/a', '/a') // => { params: null, ... }
 * matchPath('/a/:b', '/a') // => null
 * matchPath('/a/:b', '/a/abc123') // => { params: { b: 'abc123' }, ... }
 * matchPath('/a/*', '/a') // => { params: { '*': '' }, ... }
 * matchPath('/a/*', '/a/edit') // => { params: { '*': 'edit' }, ... }
 * ```
 */
export function matchPath<Pattern extends string, Params = PathParams<Pattern>>(
  pattern: Pattern,
  pathname: string,
): PathMatch<Params> | null {
  const normalisedPathname = normalisePath(pathname)
  const normalisedPattern = normalisePath(pattern)
  const params = extractPathParams(normalisedPattern, normalisedPathname)

  // If params is null, our pattern didn't match the pathname.
  if (params === null) {
    return null
  }

  return {
    params: params as Params,
    pathname: normalisedPathname,
    pattern: normalisedPattern,
  }
}

/**
 * Regular expression patterns used for path pattern compilation.
 */
const REGEX_PATTERNS = {
  FORWARD_SLASH: /\//g,
  PATH_PARAM: /:(\w+)/g,
  SPLAT_PARAM: /\/\*/g,
} as const

/**
 * Named capture group templates for different parameter types.
 */
const CAPTURE_GROUPS = {
  PATH_PARAM: '(?<$1>[^/]+)',
  SPLAT_PARAM: '/?([\\w \\/.~-]*)',
} as const

/**
 * Returns a regular expression that can be used to match a real pathname. Path parameters in
 * the pattern (e.g., ':id') will become named capture groups in the regular expression so that
 * their value can be captured.
 *
 * The compiled regular expression will always be insensitive to case.
 *
 * @param pattern the path pattern to compile into a regular expression. Should not have a trailing slash.
 *
 * @example
 * ```ts
 * compilePathPattern('/a') // => /\/a$/i
 * compilePathPattern('/a/b') // => /\/a\/b$/i
 * compilePathPattern('/a/:b') // => /\/a\/(?<b>[^/]+)$/i
 * compilePathPattern('/a/:b/c') // => /\/a\/(?<b>[^/]+)\/c$/i
 * compilePathPattern('/a/:b/*') // => /\/a\/(?<b>[^/]+)\/([\w\/]*)$/i
 * ```
 */
export function compilePathPattern(pathPattern: string): RegExp {
  // If our pattern is an empty string, we return a regex that only matches empty strings
  if (pathPattern === '') {
    return /^$/i
  }

  const regexPattern = pathPattern
    .replace(REGEX_PATTERNS.SPLAT_PARAM, CAPTURE_GROUPS.SPLAT_PARAM) // Replace /* with optional splat capture group
    .replace(REGEX_PATTERNS.FORWARD_SLASH, '\\/') // Escape forward slashes
    .replace(REGEX_PATTERNS.PATH_PARAM, CAPTURE_GROUPS.PATH_PARAM) // Replace :param with named capture groups

  return new RegExp(`${regexPattern}$`, 'i')
}

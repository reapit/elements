/**
 * Regular expression patterns used for path pattern compilation.
 */
const REGEX_PATTERNS = {
  FORWARD_SLASH: /\//g,
  PATH_PARAM: /:(\w+)/g,
  LEADING_SPLAT_PARAM: /^\*\//,
  TRAILING_SPLAT_PARAM: /\/\*$/,
} as const

/**
 * Named capture group templates for different parameter types.
 */
const CAPTURE_GROUPS = {
  PATH_PARAM: '(?<$1>[^/]+)',
  LEADING_SPLAT_PARAM: '^([\\w \\/.~-]+)/?',
  // NOTE: the leading "/" is optional because we want "/files/*" to treat "/files/" and "/files"
  // the match "" as the splat parameter's value.
  TRAILING_SPLAT_PARAM: '/?([\\w \\/.~-]*)',
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
    // Replace */ with leading splat capture group (start only)
    .replace(REGEX_PATTERNS.LEADING_SPLAT_PARAM, CAPTURE_GROUPS.LEADING_SPLAT_PARAM)
    // Replace /* with trailing splat capture group (end only)
    .replace(REGEX_PATTERNS.TRAILING_SPLAT_PARAM, CAPTURE_GROUPS.TRAILING_SPLAT_PARAM)
    // Replace :param with named capture groups
    .replace(REGEX_PATTERNS.PATH_PARAM, CAPTURE_GROUPS.PATH_PARAM)
    // Escape forward slashes
    .replace(REGEX_PATTERNS.FORWARD_SLASH, '\\/')

  return new RegExp(`${regexPattern}$`, 'i')
}

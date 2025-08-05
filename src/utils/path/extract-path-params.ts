import { compilePathPattern } from './compile-path-pattern'

/**
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/**
 * Splits the provided string type by '/' and returns a tuple of all resulting segments.
 */
type Split<TString extends string> = TString extends `${infer Prefix}/${infer Suffix}`
  ? [Prefix, ...Split<Suffix>]
  : [TString]

/**
 * Builds a type where each key is a required parameter from the given pattern. Required parameters are segments
 * that have the format `:${string}`. If there are no parameters or required parameters in the given path pattern,
 * the type will be empty.
 */
type ExtractRequiredPathParams<Pattern extends string> = {
  [K in Split<Pattern>[number] as K extends `:${infer Param}` ? Param : never]: string
}

/**
 * Builds a type that has an optional "*" property if the given pattern ends with a splat (*) parameter.
 */
type ExtractSplatPathParam<Pattern extends string> = Pattern extends `${string}*${'' | '/'}` ? { '*': string } : {}

type ExtractPathParams<Pattern extends string> = ExtractRequiredPathParams<Pattern> & ExtractSplatPathParam<Pattern>

/**
 * Extracts an object of the parameters defined in the provided path.
 */
export type PathParams<Pattern extends string> = Prettify<ExtractPathParams<Pattern>>

/**
 * Extracts path parameters, if they exist, from the path, so long as the pattern match the path. If the pattern
 * does not match the path, or if it does match but there are no path parameters defined, returns null.
 */
export function extractPathParams<Pattern extends string, Params = PathParams<Pattern>>(
  pattern: Pattern,
  pathname: string,
): Params | null {
  const regex = compilePathPattern(pattern)
  const match = pathname.match(regex)

  if (!match) {
    return null
  }

  const params: Record<string, string> = {}

  // Process named capture groups (path parameters)
  if (match.groups) {
    for (const [key, value] of Object.entries(match.groups)) {
      params[key] = value
    }
  }

  // Check if pattern has a splat and extract it from positional capture.
  // It will always be the last capture group when present
  if (pattern.includes('*') && match.length > 1) {
    params['*'] = match[match.length - 1] ?? ''
  }

  return params as Params
}

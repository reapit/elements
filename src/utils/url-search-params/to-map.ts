/**
 * Convert a URLSearchParams object to a Map, ensuring that multiple values for the same key are stored as arrays.
 *
 * @example
 *
 * ```ts
 * const searchParams = new URLSearchParams('a=1&a=2&b=3')
 * const map = toMap(searchParams)
 * console.log(map) // Map { 'a' => ['1', '2'], 'b' => ['3'] }
 * ```
 *
 * If you need a plain JavaScript object rather than a Map, simply use `Object.fromEntries`.
 *
 * @example
 *
 * ```ts
 * const searchParams = new URLSearchParams('a=1&a=2&b=3')
 * const obj = Object.fromEntries(toMap(searchParams))
 * console.log(obj) // { a: ['1', '2'], b: ['3'] }
 * ```
 *
 * @param searchParams - The URLSearchParams to convert.
 *
 * @returns A Map with the same key-value pairs as the URLSearchParams, but with multiple values for the same key
 * stored as arrays.
 */
export function toMap(searchParams: URLSearchParams): Map<string, string | string[]> {
  const result: Map<string, string | string[]> = new Map()

  // Get unique keys and sort them to ensure consistent key order in the resulting Map.
  const sortedKeys = [...new Set(Array.from(searchParams.keys()))].sort()

  for (const key of sortedKeys) {
    const values = searchParams.getAll(key)
    if (values.length > 1) {
      result.set(key, values)
    } else {
      result.set(key, values[0])
    }
  }

  return result
}

/**
 * Convert an Iterable of key-value pairs to a URLSearchParams object. The URLSearchParams object's entries will be
 * sorted alphabetically. Pairs with a null value will be removed. Pairs with an array value will be expanded into
 * multiple key-value pairs.
 *
 * @example
 *
 * ```ts
 * const data = new Map([['a', '1'], ['b', null], ['c', ['3', '4']]])
 * const searchParams = toURLSearchParams(data)
 * console.log(searchParams.toString()) // 'a=1&c=3&c=4'
 * ```
 *
 * The URLSearchParams object can be initialized with an existing URLSearchParams object. This is useful when the
 * iterable's entries represent changes that should be applied to an existing URLSearchParams object.
 *
 * @example
 *
 * ```ts
 * const data = new Map([['a', '1'], ['b', null], ['c', ['3', '4']]])
 * const searchParams = toURLSearchParams(data, new URLSearchParams('a=5&b=6&d=7'))
 * console.log(searchParams.toString()) // 'a=1&c=3&c=4&d=7'
 * ```
 *
 * @param entries - The Iterable to convert. The Iterable must yield key-value pairs (i.e. [key, value]).
 * @param init - Optional URLSearchParams object to initialize the new search params with. Entries in this object will
 * always be replaced by new entries with the same key.
 *
 * @returns A URLSearchParams object with the same key-value pairs as the Iterable.
 */
export function toURLSearchParams(entries: Iterable<[string, string | string[] | null]>, init?: URLSearchParams) {
  const searchParams = new URLSearchParams(init)

  for (const [key, value] of entries) {
    if (value === null) {
      searchParams.delete(key)
    } else if (Array.isArray(value)) {
      // The new array of entries replaces any existing entries.
      searchParams.delete(key)
      for (const item of value) {
        searchParams.append(key, item)
      }
    } else {
      // The new entry replaces any existing entries.
      searchParams.set(key, value)
    }
  }

  // Sort the entries alphabetically.
  searchParams.sort()

  return searchParams
}

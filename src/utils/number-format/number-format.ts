// ---------------------------------------------------------------------------
// Cached Intl.NumberFormat factory
// ---------------------------------------------------------------------------

// Module-level cache keyed on serialised (locale, options). The set of
// distinct (locale, options) combinations in a typical app is small, so no
// eviction is needed. The key separator is \u0000 (null byte), which is safe
// because locale tags and JSON.stringify output never contain null bytes.
// Note: differently-ordered options objects produce distinct keys — a minor
// extra instance, not a correctness issue.
const _cache = new Map<string, Intl.NumberFormat>()

/** Returns a new `Intl.NumberFormat` for the given arguments, or `null` if construction throws. */
function tryNumberFormat(locale?: string, options?: Intl.NumberFormatOptions): Intl.NumberFormat | null {
  try {
    return new Intl.NumberFormat(locale, options)
  } catch {
    return null
  }
}

/**
 * Returns a cached `Intl.NumberFormat` instance for the given locale and options.
 *
 * Degrades gracefully rather than throwing:
 * - An invalid locale tag (e.g. `'not-a-valid-locale!!'`) falls back to the
 *   runtime default locale whilst preserving the options.
 * - Invalid options (e.g. an out-of-range `maximumFractionDigits`) fall back
 *   to a formatter for the requested locale with no options applied, preserving
 *   locale-specific grouping and separators.
 * - When both the locale and options are invalid, falls back to a default
 *   formatter with no options applied.
 *
 * In all fallback cases the cached instance is stored under the original key,
 * so subsequent calls with the same arguments reuse the degraded formatter
 * rather than retrying construction.
 */
export function getIntlNumberFormat(locale?: string, options?: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale ?? ''}\u0000${options ? JSON.stringify(options) : ''}`
  let nf = _cache.get(key)
  if (!nf) {
    nf =
      tryNumberFormat(locale, options) ?? // primary attempt
      tryNumberFormat(undefined, options) ?? // locale was rejected; retry without it
      tryNumberFormat(locale, undefined) ?? // options were rejected; retry without them
      new Intl.NumberFormat(undefined) // nothing worked; safe default
    _cache.set(key, nf)
  }
  return nf
}

// ---------------------------------------------------------------------------
// Number formatting utilities
// ---------------------------------------------------------------------------

export interface LocaleNumberSeparators {
  decimal: string
  group: string
}

/**
 * Returns the decimal and group separators for a locale in a single `Intl.NumberFormat` call.
 *
 * Falls back to the runtime default locale when `locale` is invalid or omitted.
 * `group` is an empty string for locales that do not use a group separator.
 */
export function getLocaleNumberSeparators(locale?: string): LocaleNumberSeparators {
  const parts = getIntlNumberFormat(locale, { useGrouping: true }).formatToParts(12345.6)
  return {
    decimal: parts.find((p) => p.type === 'decimal')?.value ?? '',
    group: parts.find((p) => p.type === 'group')?.value ?? '',
  }
}

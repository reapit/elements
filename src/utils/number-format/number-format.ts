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
// Descriptive part classification
// ---------------------------------------------------------------------------

/**
 * The set of `Intl.NumberFormatPart` types that represent a descriptive affix
 * (currency symbol, percent sign, or unit) rather than a numeric part.
 *
 * Used both to derive the affix string and position from a formatted number
 * ({@link getNumberAffix}) and to omit those parts from the formatted overlay
 * when `showNumberPartsOnly` is set on `NumberInput`.
 */
export const DESCRIPTIVE_PART_TYPES: ReadonlySet<Intl.NumberFormatPartTypes> = new Set([
  'currency',
  'percentSign',
  'unit',
])

// ---------------------------------------------------------------------------
// Number affix utilities
// ---------------------------------------------------------------------------

/**
 * The localised affix text for a number format and its position relative to the number.
 * Returned by {@link getNumberAffix}.
 */
export interface NumberAffix {
  /** The localised affix string (e.g. `'£'`, `'€'`, `'%'`, `'kg'`). */
  affix: string
  /** Whether the affix precedes or follows the number in the given locale. */
  position: 'prefix' | 'suffix'
}

/**
 * Returns the localised affix text and its position (prefix or suffix) for a given
 * locale and format options.
 *
 * Uses `Intl.NumberFormat.formatToParts` to extract the first descriptive part
 * (currency symbol, percent sign, or unit — see {@link DESCRIPTIVE_PART_TYPES}) and
 * determines its position relative to the numeric parts in a single pass. Falls back
 * gracefully via {@link getIntlNumberFormat} — invalid options yield
 * `{ affix: '', position: 'prefix' }` rather than throwing.
 *
 * @param value - The value to format. Defaults to `0`. Position detection is reliable for
 *   any finite value, but note that the affix text itself can vary with the value when plural
 *   rules apply — for example, `currencyDisplay: 'name'` or `style: 'unit'` with a long
 *   display may return `'US dollar'` for `1` and `'US dollars'` for `2`. Pass a value
 *   representative of the intended quantity when the exact affix text matters. Non-finite
 *   values (`NaN`, `Infinity`, `-Infinity`) are normalised to `0` before formatting, because
 *   `formatToParts` omits the `integer` part for those values, which would make position
 *   detection unreliable.
 * @param locale - BCP 47 locale tag. Defaults to the runtime locale when omitted or invalid.
 *   When an invalid locale is supplied, the runtime default locale is used for both `affix`
 *   and `position`, so `position` is environment-dependent in that case.
 * @param options - `Intl.NumberFormatOptions` to pass to the formatter.
 */
export function getNumberAffix(value: number = 0, locale?: string, options?: Intl.NumberFormatOptions): NumberAffix {
  const parts = getIntlNumberFormat(locale, options).formatToParts(Number.isFinite(value) ? value : 0)
  const affixIndex = parts.findIndex((p) => DESCRIPTIVE_PART_TYPES.has(p.type))
  if (affixIndex === -1) return { affix: '', position: 'prefix' }
  const affix = parts[affixIndex].value
  const integerIndex = parts.findIndex((p) => p.type === 'integer')
  const position = affixIndex < integerIndex ? 'prefix' : 'suffix'
  return { affix, position }
}

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

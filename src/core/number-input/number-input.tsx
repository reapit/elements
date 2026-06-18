import { TextInput } from '#src/core/text-input'
import { getIntlNumberFormat, getLocaleNumberSeparators } from '#src/utils/number-format'
import { forwardRef, useCallback, useId, useMemo } from 'react'
import { parseConstraints } from './validate-range'
import { resolveOverlayValue } from './resolve-overlay'
import { useInputFilter } from './use-input-filter'
import { useRangeValidation } from './use-range-validation'

export namespace NumberInput {
  export interface Props extends Omit<TextInput.Props, 'type' | 'inputMode' | 'formatValue'> {
    /** BCP 47 locale tag. Defaults to the browser's default locale. Malformed tags (e.g. `'not-a-locale'`) fall back to the default locale rather than throwing. */
    locale?: string
    /** Options passed to `Intl.NumberFormat` for display formatting. Invalid options (e.g. an out-of-range `maximumFractionDigits`) are ignored and the locale's default formatting is used rather than throwing. */
    formatOptions?: Intl.NumberFormatOptions
    /**
     * Whether the field accepts decimals (`'decimal'`) or integers only (`'numeric'`). Also sets the
     * matching mobile virtual keyboard via the `inputMode` attribute.
     *
     * When omitted, the mode is inferred from `formatOptions`: a resolved `maximumFractionDigits` of
     * `0` (e.g. `formatOptions={{ maximumFractionDigits: 0 }}`, or styles such as `percent` and some
     * currencies that default to zero fraction digits) implies `'numeric'`; otherwise `'decimal'`.
     * Pass this prop explicitly to override the inferred value.
     */
    inputMode?: 'decimal' | 'numeric'
    /**
     * The minimum numeric value. When set to zero or above, the minus sign is blocked as
     * you type. Values below this minimum are marked invalid via the constraint validation
     * API, causing the input to match `:user-invalid` after the user interacts with it.
     * Non-numeric or absent values are treated as no minimum, allowing negatives.
     */
    min?: number | string
    /**
     * The maximum numeric value. Values above this maximum are marked invalid via the
     * constraint validation API, causing the input to match `:user-invalid` after the user
     * interacts with it. Non-numeric or absent values are treated as no maximum.
     */
    max?: number | string
    /**
     * When `true`, descriptive affix text (currency symbol, percent sign, unit) is omitted
     * from the formatted overlay while all numeric formatting — grouping separators, decimal
     * separator, fraction digits, sign — is retained. Intended for wrapper components that
     * render the affix separately as a prefix or suffix, to avoid the symbol appearing twice.
     *
     * Defaults to `false`.
     */
    showNumberPartsOnly?: boolean
  }
}

/**
 * Returns the fraction-digit bounds (`minimumFractionDigits`, `maximumFractionDigits`) that
 * `Intl.NumberFormat` resolves for the given locale and options.
 */
function getIntlFractionDigitBounds(locale?: string, options?: Intl.NumberFormatOptions): { min: number; max: number } {
  const r = getIntlNumberFormat(locale, options).resolvedOptions()
  return { min: r.minimumFractionDigits ?? 0, max: r.maximumFractionDigits ?? 0 }
}

/**
 * Derives the entry cap — the maximum number of fraction digits a user may type or paste.
 *
 * The cap is `Infinity` (unlimited) unless the consumer has expressed a clear precision intent:
 *
 * - An explicit `inputMode="numeric"` prop → `0` (highest precedence).
 * - Explicit `maximumFractionDigits` in `formatOptions` → that value (0 = integers only).
 * - A `style` of `'currency'` or `'percent'` (which carry their own Intl defaults) → the
 *   resolved `maximumFractionDigits` from `Intl.NumberFormat`.
 *
 * Plain `formatOptions` without `maximumFractionDigits` (e.g. `{ useGrouping: false }`) do not
 * cap entry, even though Intl would resolve a default `max` of 3, because a plain
 * `<NumberInput />` should accept arbitrary precision.
 */
function deriveMaxFractionDigits(
  locale: string | undefined,
  formatOptions: Intl.NumberFormatOptions | undefined,
  explicitInputMode: 'decimal' | 'numeric' | undefined,
): number {
  if (explicitInputMode === 'numeric') return 0
  if (formatOptions?.maximumFractionDigits !== undefined) {
    // Coerce to a non-negative integer so the value is safe in regex quantifiers
    // and slice calls. Intl.NumberFormat throws for out-of-range values, but
    // deriveMaxFractionDigits runs before the formatter is constructed, so we must
    // sanitise here. Non-finite or negative values are treated as no constraint.
    const raw = formatOptions.maximumFractionDigits
    const coerced = Math.trunc(raw)
    if (Number.isFinite(coerced) && coerced >= 0) return coerced
  }
  const hasPrecisionStyle = formatOptions?.style === 'currency' || formatOptions?.style === 'percent'
  if (hasPrecisionStyle) return getIntlFractionDigitBounds(locale, formatOptions).max
  return Infinity
}

/**
 * A numeric input with locale-aware display formatting. The value the user edits — and the
 * value `onChange` receives — is a plain numeric string (e.g. `"1234.5"`); the grouped,
 * locale-formatted version (e.g. `"1,234.5"`) appears as an overlay when the field is not focused.
 *
 * Use `locale` and `formatOptions` (any `Intl.NumberFormatOptions`) to control display formatting.
 * Use `min` and `max` to constrain the accepted range; out-of-range values match `:user-invalid`
 * once the field has been interacted with.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInput.Props>(
  ({ locale, formatOptions, inputMode, min, max, pattern, showNumberPartsOnly, ...rest }, ref) => {
    const fallbackId = useId()
    const inputId = rest.id ?? fallbackId

    const { parsedMin, parsedMax, allowNegative } = parseConstraints(min, max)
    const isControlled = rest.value !== undefined
    const separators = useMemo(() => getLocaleNumberSeparators(locale), [locale])

    // Resolved once; shared between the entry-cap derivation and formatValue.
    const fractionBounds = useMemo(() => getIntlFractionDigitBounds(locale, formatOptions), [locale, formatOptions])

    // How many fraction digits the user may type or paste. Infinity means unlimited.
    const maxFractionDigits = useMemo(
      () => deriveMaxFractionDigits(locale, formatOptions, inputMode),
      [locale, formatOptions, inputMode],
    )

    const allowDecimal = maxFractionDigits !== 0
    const resolvedInputMode = inputMode ?? (allowDecimal ? 'decimal' : 'numeric')

    // Locale-independent backstop: the value is always normalised to a '.'-decimal Latin-digit
    // string, so the pattern validates that canonical form regardless of locale. Consumer-supplied
    // patterns take precedence. patternMismatch flags any value that bypasses the keystroke filter
    // (e.g. a controlled value that exceeds the precision cap); it never restricts entry.
    const resolvedPattern = useMemo(() => {
      if (pattern) return pattern
      if (!allowDecimal) return '-?\\d*'
      if (Number.isFinite(maxFractionDigits)) return `-?\\d*(\\.\\d{0,${maxFractionDigits}})?`
      return '-?\\d*\\.?\\d*'
    }, [pattern, allowDecimal, maxFractionDigits])

    const formatValue = useCallback(
      (raw: string) => resolveOverlayValue(raw, { locale, formatOptions, fractionBounds, showNumberPartsOnly }),
      [locale, formatOptions, fractionBounds, showNumberPartsOnly],
    )

    useInputFilter(inputId, { separators, allowNegative, maxFractionDigits })
    useRangeValidation({ inputId, isControlled, value: rest.value, parsedMin, parsedMax })

    return (
      <TextInput
        {...rest}
        id={inputId}
        ref={ref}
        type="text"
        inputMode={resolvedInputMode}
        pattern={resolvedPattern}
        formatValue={formatValue}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'

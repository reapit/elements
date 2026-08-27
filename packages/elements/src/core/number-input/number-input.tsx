import { forwardRef, useCallback, useId, useMemo } from "react";

import { TextInput } from "#src/core/text-input";
import {
  getIntlNumberFormat,
  getLocaleNumberSeparators,
  getNumberAffix,
} from "#src/utils/number-format";

import { resolveOverlayValue } from "./resolve-overlay";
import { useInputFilter } from "./use-input-filter";
import { useRangeValidation } from "./use-range-validation";
import { parseConstraints } from "./validate-range";

/** `formatOptions.style` values that carry a localised descriptive affix. */
const AFFIX_STYLES = new Set<Intl.NumberFormatOptions["style"]>(["currency", "percent", "unit"]);

/**
 * `Intl.NumberFormatOptions` keys that are incompatible with NumberInput's guarantees:
 * significant-digit options can't soundly constrain entry (the fraction budget is
 * value-dependent), and rounding options would round the overlay away from the stored value.
 */
const UNSUPPORTED_FORMAT_OPTION_KEYS = [
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "roundingIncrement",
  "roundingMode",
  "roundingPriority",
  "trailingZeroDisplay",
] as const;

/**
 * A subset of `Intl.NumberFormatOptions` that excludes significant-digit and rounding options.
 * These options would round the overlay away from the stored value or cannot soundly constrain
 * entry, so `NumberInput` does not support them. Passing them has no effect.
 */
type SupportedNumberFormatOptions = Omit<
  Intl.NumberFormatOptions,
  (typeof UNSUPPORTED_FORMAT_OPTION_KEYS)[number]
>;

/**
 * Returns a shallow copy of `options` with unsupported formatting keys removed.
 * Returns the same reference when none are present, keeping the format-cache key stable.
 */
function stripUnsupportedFormatOptions(
  options?: Intl.NumberFormatOptions,
): SupportedNumberFormatOptions | undefined {
  if (!options) return undefined;
  const hasUnsupported = UNSUPPORTED_FORMAT_OPTION_KEYS.some((k) => k in options);
  if (!hasUnsupported) return options as SupportedNumberFormatOptions;
  const safe = { ...options };
  for (const k of UNSUPPORTED_FORMAT_OPTION_KEYS) delete (safe as Record<string, unknown>)[k];
  return safe as SupportedNumberFormatOptions;
}

/**
 * Returns the model→display scale exponent for a number format.
 *
 * For `style: 'percent'`, formatting `1` yields `100` (×100), so the exponent is `2`.
 * For all other styles (decimal, currency, unit, etc.) the exponent is `0`.
 *
 * The exponent is derived generically: format `1` with no fraction digits, extract the
 * integer part from `formatToParts`, and return `length − 1` when it matches `/^10*$/`.
 */
function getNumberFormatScaleExponent(
  locale?: string,
  options?: SupportedNumberFormatOptions,
): number {
  try {
    const fmt = getIntlNumberFormat(locale, {
      ...options,
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const integerPart = fmt.formatToParts(1).find((p) => p.type === "integer")?.value ?? "";
    if (/^10*$/.test(integerPart)) return integerPart.length - 1;
  } catch {
    // fall through
  }
  return 0;
}

export namespace NumberInput {
  export interface Props extends Omit<TextInput.Props, "type" | "inputMode" | "formatValue"> {
    /** BCP 47 locale tag. Defaults to the browser's default locale. Malformed tags (e.g. `'not-a-locale'`) fall back to the default locale rather than throwing. */
    locale?: string;
    /**
     * Options passed to `Intl.NumberFormat` for display formatting. Invalid options (e.g. an
     * out-of-range `maximumFractionDigits`) are ignored and the locale's default formatting is
     * used rather than throwing.
     *
     * When `style` is `'currency'`, `'percent'`, or `'unit'` and no affix prop (`prefix`,
     * `suffix`, `leadingIcon`, or `trailingIcon`) is supplied, the localised affix is derived
     * automatically and placed as a prefix or suffix per the locale, and the same part is omitted
     * from the formatted overlay so the symbol never appears twice. Supplying any affix prop
     * disables this derivation, leaving you free to use arbitrary affixes (e.g. `'/month'`).
     *
     * Significant-digit options (`minimumSignificantDigits`, `maximumSignificantDigits`) and
     * rounding options (`roundingIncrement`, `roundingMode`, `roundingPriority`,
     * `trailingZeroDisplay`) are not supported and are ignored. They would either round the
     * overlay away from the stored value or cannot soundly constrain entry.
     *
     * When `style` is `'percent'`, values are edited as model-space decimals (e.g. `0.255`
     * displays as `25.5%`). The default entry cap is 2 model-space fraction digits (whole
     * percentages). Pass an explicit `maximumFractionDigits` (in display-space) to allow more
     * precision (e.g. `maximumFractionDigits: 2` allows up to `0.2555` → `25.55%`).
     */
    formatOptions?: SupportedNumberFormatOptions;
    /**
     * Whether the field accepts decimals (`'decimal'`) or integers only (`'numeric'`). Also sets the
     * matching mobile virtual keyboard via the `inputMode` attribute.
     *
     * When omitted, the mode is inferred from `formatOptions`: a model-space entry cap of `0`
     * implies `'numeric'`; otherwise `'decimal'`. For `style: 'percent'`, the model cap is
     * `2` by default (not `0`), so the field defaults to `'decimal'`.
     * Pass this prop explicitly to override the inferred value.
     */
    inputMode?: "decimal" | "numeric";
    /**
     * The minimum numeric value. When set to zero or above, the minus sign is blocked as
     * you type. Values below this minimum are marked invalid via the constraint validation
     * API, causing the input to match `:user-invalid` after the user interacts with it.
     * Non-numeric or absent values are treated as no minimum, allowing negatives.
     */
    min?: number | string;
    /**
     * The maximum numeric value. Values above this maximum are marked invalid via the
     * constraint validation API, causing the input to match `:user-invalid` after the user
     * interacts with it. Non-numeric or absent values are treated as no maximum.
     */
    max?: number | string;
  }
}

/**
 * Returns the fraction-digit bounds (`minimumFractionDigits`, `maximumFractionDigits`) that
 * `Intl.NumberFormat` resolves for the given locale and options.
 */
function getIntlFractionDigitBounds(
  locale?: string,
  options?: SupportedNumberFormatOptions,
): { min: number; max: number } {
  const r = getIntlNumberFormat(locale, options).resolvedOptions();
  return { min: r.minimumFractionDigits ?? 0, max: r.maximumFractionDigits ?? 0 };
}

/**
 * Derives the entry cap: the maximum number of model-space fraction digits a user may type or paste.
 *
 * The cap is `Infinity` (unlimited) unless the consumer has expressed a clear precision intent:
 *
 * - An explicit `inputMode="numeric"` prop → `0` (highest precedence).
 * - Explicit `maximumFractionDigits` in `formatOptions` → that display-space value plus
 *   `scaleExponent` (converts to model-space).
 * - A `style` of `'currency'`, `'percent'`, or `'unit'` (which carry their own Intl defaults) →
 *   the resolved display-space `maximumFractionDigits` plus `scaleExponent`.
 *
 * Plain `formatOptions` without `maximumFractionDigits` (e.g. `{ useGrouping: false }`) do not
 * cap entry, even though Intl would resolve a default `max` of 3, because a plain
 * `<NumberInput />` should accept arbitrary precision.
 *
 * For `style: 'percent'` (scaleExponent = 2), the default display cap is 0 → model cap 2,
 * meaning up to 2 decimal places in the stored value (e.g. `0.25` → `25%`). An explicit
 * `maximumFractionDigits: 2` (display-space) yields model cap 4 (`0.2555` → `25.55%`).
 */
function deriveMaxFractionDigits(
  locale: string | undefined,
  formatOptions: SupportedNumberFormatOptions | undefined,
  explicitInputMode: "decimal" | "numeric" | undefined,
  scaleExponent: number,
): number {
  if (explicitInputMode === "numeric") return 0;
  if (formatOptions?.maximumFractionDigits !== undefined) {
    // Coerce to a non-negative integer so the value is safe in regex quantifiers
    // and slice calls. Intl.NumberFormat throws for out-of-range values, but
    // deriveMaxFractionDigits runs before the formatter is constructed, so we must
    // sanitise here. Non-finite or negative values are treated as no constraint.
    const raw = formatOptions.maximumFractionDigits;
    const coerced = Math.trunc(raw);
    if (Number.isFinite(coerced) && coerced >= 0) return coerced + scaleExponent;
  }
  const hasPrecisionStyle = AFFIX_STYLES.has(formatOptions?.style);
  if (hasPrecisionStyle)
    return getIntlFractionDigitBounds(locale, formatOptions).max + scaleExponent;
  return Infinity;
}

/**
 * A numeric input with locale-aware display formatting. The value the user edits: and the
 * value `onChange` receives: is a plain numeric string (e.g. `"1234.5"`); the grouped,
 * locale-formatted version (e.g. `"1,234.5"`) appears as an overlay when the field is not focused.
 *
 * Use `locale` and `formatOptions` (any `Intl.NumberFormatOptions`) to control display formatting.
 * Use `min` and `max` to constrain the accepted range; out-of-range values match `:user-invalid`
 * once the field has been interacted with.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInput.Props>(
  (
    {
      locale,
      formatOptions,
      inputMode,
      min,
      max,
      pattern,
      prefix,
      suffix,
      leadingIcon,
      trailingIcon,
      ...rest
    },
    ref,
  ) => {
    const fallbackId = useId();
    const inputId = rest.id ?? fallbackId;

    const { parsedMin, parsedMax, allowNegative } = parseConstraints(min, max);
    const isControlled = rest.value !== undefined;
    const separators = useMemo(() => getLocaleNumberSeparators(locale), [locale]);

    // Strip unsupported display-shaping options once; all Intl-bound paths use this safe copy.
    const safeFormatOptions = useMemo(
      () => stripUnsupportedFormatOptions(formatOptions),
      [formatOptions],
    );

    // Model→display scale exponent: 2 for percent (×100), 0 for everything else.
    const scaleExponent = useMemo(
      () => getNumberFormatScaleExponent(locale, safeFormatOptions),
      [locale, safeFormatOptions],
    );

    // Resolved once; shared between the entry-cap derivation and formatValue.
    const fractionBounds = useMemo(
      () => getIntlFractionDigitBounds(locale, safeFormatOptions),
      [locale, safeFormatOptions],
    );

    // How many model-space fraction digits the user may type or paste. Infinity means unlimited.
    const maxFractionDigits = useMemo(
      () => deriveMaxFractionDigits(locale, safeFormatOptions, inputMode, scaleExponent),
      [locale, safeFormatOptions, inputMode, scaleExponent],
    );

    const allowDecimal = maxFractionDigits !== 0;
    const resolvedInputMode = inputMode ?? (allowDecimal ? "decimal" : "numeric");

    // Locale-independent backstop: the value is always normalised to a '.'-decimal Latin-digit
    // string, so the pattern validates that canonical form regardless of locale. Consumer-supplied
    // patterns take precedence. patternMismatch flags any value that bypasses the keystroke filter
    // (e.g. a controlled value that exceeds the precision cap); it never restricts entry.
    const resolvedPattern = useMemo(() => {
      if (pattern) return pattern;
      if (!allowDecimal) return "-?\\d*";
      if (Number.isFinite(maxFractionDigits)) return `-?\\d*(\\.\\d{0,${maxFractionDigits}})?`;
      return "-?\\d*\\.?\\d*";
    }, [pattern, allowDecimal, maxFractionDigits]);

    // A consumer-supplied affix always wins. When the consumer provides any of prefix, suffix,
    // leadingIcon, or trailingIcon, no affix is derived and the overlay is formatted in full;
    // arbitrary, non-Intl affixes (e.g. "/month", "px") are supported without interference.
    const hasConsumerAffix =
      prefix !== undefined ||
      suffix !== undefined ||
      leadingIcon !== undefined ||
      trailingIcon !== undefined;

    // Otherwise, when formatOptions carries a descriptive style, derive the affix (currency
    // symbol, percent sign, or unit) and its position from the locale. The derived affix is
    // rendered as a prefix or suffix by TextInput, and the overlay strips the same part to
    // avoid the symbol appearing twice.
    const { affix, position } = useMemo(
      () =>
        !hasConsumerAffix && AFFIX_STYLES.has(safeFormatOptions?.style)
          ? getNumberAffix(0, locale, safeFormatOptions)
          : { affix: "", position: "prefix" as const },
      [hasConsumerAffix, locale, safeFormatOptions],
    );
    // The overlay drops the descriptive part only when we injected the derived affix; an explicit
    // consumer affix leaves the overlay untouched.
    const showNumberPartsOnly = affix !== "";
    const derivedPrefix = position === "prefix" && affix !== "" ? affix : undefined;
    const derivedSuffix = position === "suffix" && affix !== "" ? affix : undefined;
    const resolvedPrefix = hasConsumerAffix ? prefix : derivedPrefix;
    const resolvedSuffix = hasConsumerAffix ? suffix : derivedSuffix;

    const formatValue = useCallback(
      (raw: string) =>
        resolveOverlayValue(raw, {
          locale,
          formatOptions: safeFormatOptions,
          fractionBounds,
          showNumberPartsOnly,
          scaleExponent,
        }),
      [locale, safeFormatOptions, fractionBounds, showNumberPartsOnly, scaleExponent],
    );

    useInputFilter(inputId, { separators, allowNegative, maxFractionDigits });
    useRangeValidation({ inputId, isControlled, value: rest.value, parsedMin, parsedMax });

    return (
      <TextInput
        {...rest}
        id={inputId}
        ref={ref}
        type="text"
        inputMode={resolvedInputMode}
        pattern={resolvedPattern}
        formatValue={formatValue}
        prefix={resolvedPrefix}
        suffix={resolvedSuffix}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";

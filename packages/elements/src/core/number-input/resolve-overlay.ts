import { getIntlNumberFormat, DESCRIPTIVE_PART_TYPES } from "#src/utils/number-format";

import { CANONICAL_VALUE_PATTERN } from "./resolve-input";

// The maximum `maximumFractionDigits` / `minimumFractionDigits` that
// `Intl.NumberFormat` accepts. Passing a larger value throws a RangeError.
// A value with more fraction digits than this (only reachable via a controlled
// `value` prop) is shown clamped to 100 digits rather than hidden: the one
// place the overlay's "never rounds" rule yields, because `maximumFractionDigits`
// rounds rather than truncates. Such values are also flagged by the `pattern`
// backstop (`patternMismatch`) and never represent a valid submittable value.
const INTL_MAX_FRACTION_DIGITS = 100;

/**
 * The fraction-digit bounds `Intl.NumberFormat` resolves for a given locale and options.
 * Passed in so the overlay and the entry-cap derivation share a single resolution.
 */
export interface FractionDigitDefaults {
  min: number;
  max: number;
}

export interface ResolveOverlayValueParams {
  locale: string | undefined;
  formatOptions: Intl.NumberFormatOptions | undefined;
  fractionBounds: FractionDigitDefaults;
  /**
   * Model→display scale exponent. `2` for `style: 'percent'` (model `×100` = display),
   * `0` for all other styles. Used to convert model-space `actualFractionDigits` into
   * display-space before computing the overlay's fraction-digit floor, so the "never
   * rounds" guarantee is upheld in the display domain.
   */
  scaleExponent: number;
  /**
   * When `true`, descriptive affix parts (`currency`, `percentSign`, `unit`) are omitted
   * from the formatted overlay, and any orphaned literal whitespace they leave is trimmed.
   * Intended for wrappers that render the affix separately as a prefix or suffix.
   */
  showNumberPartsOnly?: boolean;
}

/**
 * Produces the locale-formatted overlay string for a raw NumberInput value, upholding three rules:
 *
 * 1. **The overlay represents the same number as the value.** Only values matching the canonical
 *    contract shape (`{@link CANONICAL_VALUE_PATTERN}`) are formatted; anything else: `'1e5'`,
 *    `'0x10'`, `'Infinity'`, `'1_000'`, whitespace: is returned **unchanged**, so the overlay
 *    shows the raw value verbatim (visually inert, sitting over the identical input text) rather
 *    than a reinterpreted number (e.g. `'1e5'` must never render as `100,000`).
 * 2. **The overlay never rounds.** `maximumFractionDigits` is always at least the number of
 *    fraction digits actually present, even when a consumer `formatOptions` cap is lower, so an
 *    over-cap controlled value is shown verbatim rather than rounded.
 * 3. **When `showNumberPartsOnly` is set, descriptive affix parts are omitted.** The
 *    `currency`, `percentSign`, and `unit` parts (and any orphaned literal whitespace they
 *    leave) are stripped from the output. The numeric parts: grouping, decimal, fraction
 *    digits, sign: are preserved exactly.
 *
 * Precision is preserved across the full numeric range:
 *
 * - Integers beyond `Number.MAX_SAFE_INTEGER` are passed to `Intl.NumberFormat` as a `BigInt`.
 * - Decimals (and safe-magnitude integers) are passed as the **raw string**, so
 *   `Intl.NumberFormat` formats them at arbitrary precision rather than routing through
 *   `Number` first and losing precision in the process.
 *
 * The partial states (`''`, `'-'`, `'.'`, `'-.'`) are not complete numbers and are returned
 * unchanged (so the overlay is visually inert): `''` and `'-'` are short-circuited explicitly,
 * while `'.'` and `'-.'` reach the `Number()` check and yield `NaN`.
 *
 * @returns The formatted overlay string (trimmed when `showNumberPartsOnly` strips affix parts),
 * or `raw` unchanged when the value cannot be formatted faithfully (the overlay then renders the
 * raw text, visually inert).
 */
export function resolveOverlayValue(
  raw: string,
  {
    locale,
    formatOptions,
    fractionBounds,
    scaleExponent,
    showNumberPartsOnly,
  }: ResolveOverlayValueParams,
): string {
  // `Number('')` is `0`, not `NaN`, so the empty string needs an explicit short-circuit before the NaN check.
  if (raw === "" || raw === "-") return raw;

  // Reject anything outside the canonical value shape so the overlay only ever formats a value it can represent faithfully.
  if (!CANONICAL_VALUE_PATTERN.test(raw)) return raw;

  const num = Number(raw);
  // The remaining partial states that match the canonical shape (`'.'` and `'-.'`) produce NaN;
  // hide the overlay for them too.
  if (Number.isNaN(num)) return raw;

  const dotIndex = raw.indexOf(".");
  const actualFractionDigits = dotIndex === -1 ? 0 : raw.length - dotIndex - 1;

  // For integers beyond Number.MAX_SAFE_INTEGER, Number(raw) silently loses precision; format the
  // exact value via BigInt. The canonical gate guarantees a no-dot value here matches /^-?\d+$/,
  // so BigInt() cannot throw: the try/catch is a defensive backstop only. Decimals (and
  // safe-magnitude integers) pass through as the raw string for arbitrary-precision formatting.
  //
  // The cast to `${number}` is a deliberate author assertion. The lib's StringNumericLiteral
  // type (`${number} | "Infinity" | "-Infinity" | "+Infinity"`) and CANONICAL_VALUE_PATTERN are
  // overlapping but distinct sets: `${number}` accepts '1e5'/'0x10' (which the gate rejects)
  // and rejects '1.'/'-.'/'' (which the gate's shape allows). The three guards above: the
  // '' / '-' short-circuit, the canonical gate, and the NaN check: collectively narrow `raw`
  // to a runtime-numeric form that format() accepts, but TypeScript cannot infer this from a
  // runtime regex test. Note: a type predicate `raw is \`${number}\`` would be unsound for the
  // same reason (the two sets do not coincide), and should not be introduced as a "fix".
  let value: bigint | `${number}` = raw as `${number}`;
  if (dotIndex === -1 && !Number.isSafeInteger(num)) {
    try {
      value = BigInt(raw);
    } catch {
      return raw;
    }
  }

  // Convert model-space fraction digits to display-space for the floor calculation.
  // For percent (scaleExponent=2), a model value of 0.255 has 3 model fraction digits but
  // only 1 display fraction digit (25.5%), so the floor must be 1, not 3.
  const displayActualFractionDigits = Math.max(0, actualFractionDigits - scaleExponent);

  // The overlay must never round: maximumFractionDigits is at least displayActualFractionDigits.
  const resolvedMax = Math.min(
    Math.max(
      displayActualFractionDigits,
      formatOptions?.maximumFractionDigits ?? fractionBounds.max,
    ),
    INTL_MAX_FRACTION_DIGITS,
  );
  const resolvedMin = Math.min(
    Math.max(
      displayActualFractionDigits,
      formatOptions?.minimumFractionDigits ?? fractionBounds.min,
    ),
    resolvedMax,
  );

  const options: Intl.NumberFormatOptions = {
    ...formatOptions,
    minimumFractionDigits: resolvedMin,
    maximumFractionDigits: resolvedMax,
  };

  if (!showNumberPartsOnly) return getIntlNumberFormat(locale, options).format(value);

  return getIntlNumberFormat(locale, options)
    .formatToParts(value)
    .filter((p) => !DESCRIPTIVE_PART_TYPES.has(p.type))
    .map((p) => p.value)
    .join("")
    .trim();
}

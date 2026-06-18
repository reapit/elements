/**
 * Range validation for NumberInput.
 *
 * These helpers **rely on** the value contract (see `ARCHITECTURE.md` and
 * `resolve-input.ts`): any value that is not a partial (`''` or `'-'`) is
 * assumed to be a canonical, `Number()`-parseable string.
 */

/**
 * Parsed and derived constraint values from the raw `min`/`max` props.
 */
export interface NumberConstraints {
  parsedMin: number
  parsedMax: number
  /** `true` when the min constraint does not exclude negative numbers. */
  allowNegative: boolean
}

/**
 * Parses the raw `min` and `max` props into numeric constraints.
 *
 * - `undefined`, `''`, or whitespace-only strings → `NaN` (treated as no constraint).
 * - Non-numeric strings → `NaN` (treated as no constraint).
 * - Non-finite values (e.g. `Infinity`, `-Infinity`) → `NaN` (treated as no constraint).
 * - `allowNegative` is `true` unless `parsedMin` is a finite number >= 0.
 */
export function parseConstraints(min?: number | string, max?: number | string): NumberConstraints {
  const parsedMin = parseConstraint(min)
  const parsedMax = parseConstraint(max)
  const allowNegative = Number.isNaN(parsedMin) || parsedMin < 0

  return { parsedMin, parsedMax, allowNegative }
}

function parseConstraint(value?: number | string): number {
  if (value === undefined) return NaN
  const trimmed = typeof value === 'string' ? value.trim() : value
  if (trimmed === '') return NaN
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : NaN
}

// ---------------------------------------------------------------------------
// Range validation
// ---------------------------------------------------------------------------

/**
 * Returns a `setCustomValidity` token when `raw` is a complete number outside
 * the given constraints, or `''` to clear validity.
 *
 * Partial values (`''` and `'-'`) are treated as not-yet-complete and do not
 * trigger an error. `NaN` constraints are treated as no constraint.
 *
 * The returned tokens mirror `ValidityState` property names so that consumers
 * can map them to localised error messages. The `'badInput'` token is returned
 * for values that are non-empty, non-partial, and unparseable as a number
 * (e.g. `'.'` or `'-.'`); this prevents the constraint validation API from
 * treating those values as valid and lets forms gate submission appropriately.
 */
export function validateRange(
  raw: string,
  parsedMin: number,
  parsedMax: number,
): '' | 'badInput' | 'rangeUnderflow' | 'rangeOverflow' {
  if (raw === '' || raw === '-') return ''

  const num = Number(raw)
  if (Number.isNaN(num)) return 'badInput'

  if (!Number.isNaN(parsedMin) && num < parsedMin) return 'rangeUnderflow'
  if (!Number.isNaN(parsedMax) && num > parsedMax) return 'rangeOverflow'

  return ''
}

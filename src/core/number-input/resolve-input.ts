// ---------------------------------------------------------------------------
// Value contract
// ---------------------------------------------------------------------------
//
// The helpers in this module exist to uphold the NumberInput value contract:
// the input's `.value` is always one of
//
//   - `''`  — no value yet,
//   - `'-'` — an in-progress negative, or
//   - a canonical numeric string: ASCII digits, at most one `.` decimal point,
//     and an optional leading `-`, always parseable by `Number()`.
//
// The value never contains locale group/decimal separators, non-Latin digits,
// or any other character — locale affects only the overlay display. When
// decimals are disallowed (`maxFractionDigits === 0`) the canonical form
// additionally contains no `.` (integers only). When `maxFractionDigits` is a
// finite positive number, the fractional part contains at most that many digits.
//
// See `ARCHITECTURE.md` for the full contract and how the rest of the
// component relies on it.

/** The start and end of the current text selection (both 0-indexed). */
export interface Selection {
  start: number
  end: number
}

/**
 * The resolved outcome for a pending `beforeinput` event.
 *
 * - `allow`  — let the browser insert the character natively (preserves the native undo stack).
 * - `reject` — call `preventDefault()` and do nothing further.
 * - `commit` — call `preventDefault()`, write `value` imperatively, and move the cursor to `cursor`.
 */
export type InputResolution = { type: 'allow' } | { type: 'reject' } | { type: 'commit'; value: string; cursor: number }

/**
 * Matches the canonical numeric value shape (see the value contract above): ASCII digits,
 * at most one `.` decimal point, and an optional leading `-`. Also matches the partial states
 * `''`, `'-'`, `'.'`, and `'-.'`.
 *
 * This is the single source of truth for "is this string the shape the component produces?".
 * It is reused both to validate spliced paste fragments (`resolvePaste`) and to gate the overlay
 * formatter (`resolveOverlayValue`), so that non-canonical controlled values — e.g. `'1e5'`,
 * `'0x10'`, `'Infinity'` — are treated consistently as outside the contract.
 */
export const CANONICAL_VALUE_PATTERN = /^-?\d*\.?\d*$/

// ---------------------------------------------------------------------------
// Input classification
// ---------------------------------------------------------------------------

/**
 * Classifies a `beforeinput` event into one of three categories:
 *
 * - `'ignore'`     — composition events and events with no data; let the browser handle them.
 * - `'paste'`      — multi-character insertions, paste, drop, yank, and replacement inputs;
 *                    require full sanitisation before insertion.
 * - `'keystroke'`  — single-character insertions typed directly by the user.
 */
export function classifyInputType(event: { data: string | null; inputType: string }): 'ignore' | 'paste' | 'keystroke' {
  if (!event.data) return 'ignore'
  if (event.inputType === 'insertCompositionText') return 'ignore'

  if (
    event.data.length > 1 ||
    event.inputType === 'insertFromPaste' ||
    event.inputType === 'insertFromPasteAsQuotation' ||
    event.inputType === 'insertFromYank' ||
    event.inputType === 'insertFromDrop' ||
    event.inputType === 'insertReplacementText'
  ) {
    return 'paste'
  }

  return 'keystroke'
}

// ---------------------------------------------------------------------------
// Paste sanitisation
// ---------------------------------------------------------------------------

/**
 * Sanitises a pasted string into a raw numeric string suitable for splicing
 * into the input value:
 *
 * 1. Strips group separators (e.g. `,` in `en-GB`).
 * 2. Normalises locale decimal separators to `.`.
 * 3. Removes every remaining non-numeric, non-`.`, non-`-` character.
 * 4. Truncates at the first structurally-invalid separator, keeping the
 *    canonical leading number:
 *    - When `maxFractionDigits` is `0`, keeps the integer part only, discarding
 *      the fractional portion entirely (`12.99` → `12`).
 *    - Otherwise, keeps the integer part and the first fractional group,
 *      discarding any later groups (`1.2.3.4` → `1.2`).
 * 5. Truncates the fractional part to `maxFractionDigits` digits (by omission,
 *    not rounding). Has no effect when `maxFractionDigits` is `Infinity`.
 */
export function sanitisePastedText(
  data: string,
  separators: { decimal: string; group: string },
  maxFractionDigits: number = Infinity,
): string {
  const allowDecimal = maxFractionDigits !== 0

  const stripped = data
    .replaceAll(separators.group, '')
    .replaceAll(separators.decimal, '.')
    .replace(/[^\d.-]/g, '')

  const [intPart, ...fracParts] = stripped.split('.')
  if (!allowDecimal || fracParts.length === 0) return intPart

  const fracPart = Number.isFinite(maxFractionDigits) ? fracParts[0].slice(0, maxFractionDigits) : fracParts[0]

  return `${intPart}.${fracPart}`
}

// ---------------------------------------------------------------------------
// Paste resolution
// ---------------------------------------------------------------------------

/**
 * Resolves a sanitised paste fragment against the current input state.
 *
 * Returns `reject` when:
 * - The sanitised text contains a minus sign after position 0 (embedded minus).
 * - The sanitised text starts with `-` and negatives are not allowed.
 * - Splicing the fragment into the current value would produce an invalid number
 *   string (e.g. duplicate decimal points or embedded minus).
 * - The sanitised text is empty.
 *
 * Returns `commit` with the new value and cursor position on success.
 */
export function resolvePaste(params: {
  currentValue: string
  selection: Selection
  sanitised: string
  allowNegative: boolean
}): InputResolution {
  const { currentValue, selection, sanitised, allowNegative } = params

  if (!sanitised) return { type: 'reject' }

  if (sanitised.slice(1).includes('-') || (!allowNegative && sanitised.startsWith('-'))) {
    return { type: 'reject' }
  }

  const newValue = currentValue.slice(0, selection.start) + sanitised + currentValue.slice(selection.end)
  // The canonical pattern permits a leading '-'; when negatives are disallowed, derive the
  // minus-free variant from the same source so the two stay in lockstep.
  const validPattern = allowNegative
    ? CANONICAL_VALUE_PATTERN
    : new RegExp(CANONICAL_VALUE_PATTERN.source.replace('-?', ''))
  if (!validPattern.test(newValue)) return { type: 'reject' }

  return { type: 'commit', value: newValue, cursor: selection.start + sanitised.length }
}

// ---------------------------------------------------------------------------
// Keystroke resolution
// ---------------------------------------------------------------------------

/**
 * Resolves a single-character keystroke against the current input state.
 *
 * Returns `reject` when:
 * - The character is not a digit, the locale decimal separator, or `-`.
 * - The character is the decimal separator but decimals are disallowed
 *   (`maxFractionDigits === 0`, e.g. `inputMode="numeric"`).
 * - A second decimal point would be introduced.
 * - The digit would push the fractional part beyond `maxFractionDigits`.
 * - A `-` is typed at any position other than the very start, or when a `-`
 *   is already present at the start without the cursor covering it.
 *
 * Returns `commit` when the locale decimal separator differs from `.` and
 * a `.` must be inserted in its place (so the raw value stays parseable by
 * `Number()`).
 *
 * Returns `allow` for all other valid characters, deferring to the browser's
 * native insertion (preserves the native undo stack and caret behaviour).
 */
export function resolveKeystroke(params: {
  currentValue: string
  selection: Selection
  data: string
  decimalSep: string
  allowNegative: boolean
  maxFractionDigits?: number
}): InputResolution {
  const { currentValue, selection, data, decimalSep, allowNegative, maxFractionDigits = Infinity } = params

  const allowDecimal = maxFractionDigits !== 0
  const isDecimalSeparator = data === '.' || data === decimalSep

  if (isDecimalSeparator && !allowDecimal) return { type: 'reject' }

  const isDigit = /^\d$/.test(data)
  const isMinus = allowNegative && data === '-'
  if (!isDigit && !isDecimalSeparator && !isMinus) return { type: 'reject' }

  if (isDecimalSeparator) {
    const valueOutsideSelection = currentValue.slice(0, selection.start) + currentValue.slice(selection.end)
    if (valueOutsideSelection.includes('.')) return { type: 'reject' }
  }

  // Keep the raw value parseable by Number().
  if (data === decimalSep && decimalSep !== '.') {
    const newValue = currentValue.slice(0, selection.start) + '.' + currentValue.slice(selection.end)
    return { type: 'commit', value: newValue, cursor: selection.start + 1 }
  }

  if (data === '-') {
    const alreadyHasMinus = currentValue.startsWith('-') && selection.end === 0
    if (selection.start !== 0 || alreadyHasMinus) return { type: 'reject' }
  }

  if (isDigit && Number.isFinite(maxFractionDigits)) {
    // Project the value after the selection is replaced by this digit.
    const projected = currentValue.slice(0, selection.start) + data + currentValue.slice(selection.end)
    const dotIndex = projected.indexOf('.')
    if (dotIndex !== -1 && projected.length - dotIndex - 1 > maxFractionDigits) return { type: 'reject' }
  }

  return { type: 'allow' }
}

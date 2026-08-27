# NumberInput Architecture

## Overview

NumberInput is a numeric input built on TextInput. It stores the raw
numeric string (e.g. `1234567.89`) as the input's value and uses TextInput's
formatted-value overlay to display locale-aware formatting (e.g. `1,234,567.89`
in `en-GB` or `1.234.567,89` in `de-DE`).

## Requirements

1. The input's `.value` is always canonical: empty, a defined partial state (`'-'`, `'.'`, `'-.'`), or a plain numeric string; a non-canonical controlled value is displayed verbatim and flagged via `patternMismatch`.
2. Locale affects only the overlay display, never the value. This keeps the value locale-independent, so form submission, server-side parsing, and `onChange` handlers never need to know the active locale.
3. The overlay never rounds. It displays exactly the digits present in the value, padded to any consumer `minimumFractionDigits`. The 100-digit `Intl.NumberFormat` ceiling is the single exception.
4. The component requires full control over value representation and entry; `type="number"` cannot provide this. See [Why `type="text"`](#why-typetext-instead-of-typenumber).
5. By default, the field accepts any number of fraction digits. When `maximumFractionDigits` is specified or implied by a style with its own Intl defaults (such as `currency`, `percent`, or `unit`), entry beyond that cap is rejected.
6. All interactive input (typing, paste, and drop) must be sanitised before it reaches the value.
7. `min` and `max` must be supported. A value outside those bounds must be marked invalid via the constraint validation API.
8. A default `pattern` must flag values that bypass entry filtering (for example, a controlled value that exceeds the precision cap). A consumer-supplied `pattern` takes precedence.
9. When a currency, percent, or unit format is used, the format's affix becomes the input's prefix or suffix based on locale. An explicit affix prop takes precedence.

## Value contract

The single invariant the rest of the component is built around: the input's
`.value` is **always** one of

- `''` — no value yet;
- `'-'` — an in-progress negative;
- `'.'` — a decimal point with no digits yet;
- `'-.'` — a negative decimal point with no digits yet; or
- a **canonical numeric string**: ASCII digits, at most one `.` decimal point,
  and an optional leading `-`, always parseable by `Number()`.

The partial states (`''`, `'-'`, `'.'`, `'-.'`) represent in-progress entry
that has not yet produced a complete number. Range validation treats them as
not-yet-complete (`''`/`'-'`) or `badInput` (`'.'`/`'-.'`), and the overlay
formatter shows nothing for them. Note their interaction with `Number()` is not
uniform: `Number('')` is `0`, whereas `Number('-')`, `Number('.')`, and
`Number('-.')` are `NaN`. The overlay therefore short-circuits `''` and `'-'`
explicitly before its `Number()`/`NaN` check (see `resolveOverlayValue`).

A trailing decimal point on digits (e.g. `'1234.'`) is not a separate partial state: `Number('1234.')` is `1234`, so it is a valid canonical numeric string.
The overlay formats it as the number it represents (e.g. `'1,234'`), applying
any consumer `minimumFractionDigits` padding as normal (e.g. `'12.'` with
`minimumFractionDigits: 2` → `'12.00'`).

The value **never** contains locale group/decimal separators, non-Latin digits,
or any other character. **Locale affects only the overlay display, never the
value.** Keeping locale out of the value means consumers always parse and submit a stable, locale-independent string, regardless of display settings. In `numeric` mode the canonical form additionally contains no `.` (integers only).

Every subsystem either **upholds** this contract or **relies on** it:

- _Upholds_ — keystroke filtering, paste/drop sanitisation, and locale decimal
  normalisation (`resolve-input.ts`, `use-input-filter.ts`) guarantee only
  canonical characters ever reach the value.
- _Relies on_ — range validation (`validate-range.ts`) and the overlay
  formatter (`resolveOverlayValue` in `resolve-overlay.ts`) assume `Number(value)`
  is meaningful for any canonical numeric string. Partial states are handled
  explicitly: range validation flags them as `badInput`; the overlay formatter
  returns the raw string unchanged for any value it cannot represent faithfully.

The single canonical value shape is encoded once as `CANONICAL_VALUE_PATTERN`
(`/^-?\d*\.?\d*$/`, in `resolve-input.ts`) and reused by both the paste
validator and the overlay gate, so "is this the shape the component produces?"
has one definition.

### Non-canonical controlled values

The entry filter guarantees the contract for values the component **produces**,
but a controlled `value` prop can supply any string. A value that `Number()`
accepts yet the filter would never emit (such as `'1e5'`, `'0x10'`, `'Infinity'`, `'1_000'`, whitespace-padded numbers) is **not** formatted: `resolveOverlayValue`
returns it unchanged, so the overlay shows the raw value verbatim rather than a
reinterpreted number (e.g. it must never render `'1e5'` as `100,000`). Such values
are also flagged by the `pattern` backstop (`patternMismatch`) and so match
`:user-invalid` once the field has been interacted with.

Because the contract fixes the _shape_ of the value but not the _set of
accepted inputs_, the accept-set can be widened later (e.g. non-Latin
numbering systems, typed group separators) without a breaking change: such
changes only make previously-rejected input acceptable while still emitting a
canonical value.

## Integer vs decimal entry (`inputMode`)

`inputMode` selects whether the field accepts decimals (`'decimal'`) or
integers only (`'numeric'`), and sets the matching mobile virtual keyboard.

When the prop is omitted it is **inferred** from the formatting options via
`deriveMaxFractionDigits` (see below): a resolved entry cap of `0` implies
`'numeric'`, otherwise `'decimal'`.

In `numeric` mode the keystroke filter rejects the decimal separator and the
paste sanitiser drops the fractional portion (`12.99` → `12`), keeping the
value an integer per the contract.

## Precision cap and display

### Model-space vs display-space

Some `Intl.NumberFormat` styles multiply the stored value before display.
`style: 'percent'` multiplies by 100 (`0.255` → `25.5%`); all other styles
(`'decimal'`, `'currency'`, `'unit'`) leave the value unchanged.

NumberInput tracks this via a **scale exponent**: the base-10 exponent of the multiplier (percent = 2, all others = 0). The exponent is derived generically:
format `1` with no fraction digits and inspect the integer part; `'100'` →
length 3 → exponent 2.

The value `.value` is always a model-space decimal. The scale exponent is
applied in two places:

1. **Entry cap.** `deriveMaxFractionDigits` adds the exponent to any
   display-space cap, converting it to model-space. For `style: 'percent'`:
   - Default display cap 0 → model cap **2** (e.g. `0.25` allowed, `0.255`
     flagged by the pattern backstop).
   - Explicit `maximumFractionDigits: 2` (display) → model cap **4** (e.g.
     `0.2555` → `25.55%`).

2. **Overlay floor.** `resolveOverlayValue` converts `actualFractionDigits`
   (model-space) to `displayActualFractionDigits` before computing the
   fraction-digit floor (`max(0, actual − scaleExponent)`), so the "never
   rounds" guarantee is upheld in display-space.

### Entry cap (`maxFractionDigits`)

The `maxFractionDigits` value controls how many **model-space** fraction digits
the user may type or paste. It is derived from props by `deriveMaxFractionDigits`:

| Condition                                                            | Cap                                                                           |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `inputMode="numeric"` prop                                           | `0` (highest precedence)                                                      |
| Explicit `formatOptions.maximumFractionDigits`                       | That display-space value + scale exponent (model-space)                       |
| `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'`      | Resolved display-space `maximumFractionDigits` + scale exponent (model-space) |
| Everything else (bare `<NumberInput />`, `useGrouping: false`, etc.) | `Infinity` (unlimited)                                                        |

Plain `formatOptions` without `maximumFractionDigits` and without a
style that carries its own Intl defaults (e.g. `{ useGrouping: false }`) do not
cap entry, even though `Intl.NumberFormat` would resolve a default `max` of 3. A bare
`<NumberInput />` must accept arbitrary precision.

The keystroke filter rejects a digit that would push the fractional part beyond
the cap. The paste sanitiser truncates (never rounds) the fractional part to the
cap. Integer mode (`cap === 0`) is the limiting case of this same mechanism.

### Overlay display

The overlay never rounds. Its rule: display exactly what the value contains,
padded up to the format's resolved `minimumFractionDigits`. This is implemented
by the pure `resolveOverlayValue` (`resolve-overlay.ts`), which is gated on
`CANONICAL_VALUE_PATTERN` so it only ever formats a value it can represent
faithfully (see [Non-canonical controlled values](#non-canonical-controlled-values)).

Precision is preserved across the full numeric range by choosing the argument
type passed to `Intl.NumberFormat`:

- **Integers beyond `Number.MAX_SAFE_INTEGER`** are passed as a `BigInt`, since
  `Number(raw)` would silently round them first. The canonical gate guarantees a
  no-dot value matches `/^-?\d+$/`, so `BigInt(raw)` cannot throw (a defensive
  `try/catch` remains as a backstop).
- **Decimals (and safe-magnitude integers)** are passed as the **raw string**,
  so `Intl.NumberFormat` formats them at arbitrary precision rather than routing
  through `Number` first and losing precision in the process
  (e.g. `"9007199254740993.5"`).

The resolved fraction-digit bounds are clamped to `INTL_MAX_FRACTION_DIGITS`
(100, the maximum `Intl.NumberFormat` accepts) so a pathologically long
controlled value is shown clamped rather than throwing a `RangeError`. Beyond
100 fraction digits the clamp **rounds** at the 100th digit; this is the single place the "never rounds" rule yields. Such values are also flagged by the `pattern`
backstop (`patternMismatch`) and never represent a valid submittable value.

Formally (before the 100-digit clamp):

```
resolvedMin = max(actualFractionDigits, format.minimumFractionDigits)
resolvedMax = max(actualFractionDigits, format.maximumFractionDigits)
```

This means:

- `style: 'currency'`, value `"5"` → overlay `£5.00` (padded to min = 2).
- `maximumFractionDigits: 2`, value `"1.999"` → overlay `1.999` (actual precision exceeds consumer cap; `resolvedMax` is raised to 3; no rounding occurs).
- `minimumFractionDigits: 2`, value `"1.5"` → overlay `1.50` (actual precision is below consumer min; padding applied as normal).

### Unsupported display-shaping options

The following `Intl.NumberFormatOptions` keys are excluded from `formatOptions`
at the type level and stripped at runtime (by `stripUnsupportedFormatOptions`
before any Intl call):

- **Significant-digit options:** `minimumSignificantDigits`, `maximumSignificantDigits`; the fraction budget is value-dependent and trailing-zero semantics are ambiguous, so they cannot soundly constrain entry.
- **Rounding options:** `roundingIncrement`, `roundingMode`, `roundingPriority`, `trailingZeroDisplay`; they would round the overlay away from the stored value, violating the "overlay never rounds" guarantee.

Passing these options is deliberately **not an error** (graceful degradation is
preserved). The runtime strip is a defence-in-depth backstop for callers that
bypass TypeScript (e.g. `as any`). The `stripUnsupportedFormatOptions` helper
returns the same object reference when no unsupported keys are present, keeping
the format-cache key stable.

### Auto-affix derivation

`NumberInput` accepts the `prefix`, `suffix`, `leadingIcon`, and `trailingIcon` props inherited
from `TextInput`, so arbitrary affixes that have no `Intl` equivalent (such as `'/month'`, `'px'`, a
search icon; they are fully supported.

In addition, when the consumer supplies **none** of those affix props and `formatOptions.style` is `'currency'`, `'percent'`, or `'unit'`, `NumberInput` derives the localised affix (currency symbol, percent sign, or unit label) and its position from `getNumberAffix`. The derived affix is passed to `TextInput` as either `prefix` or `suffix` depending on the locale convention, and an internal `showNumberPartsOnly` flag is set to `true` to strip the same descriptive part from the formatted overlay, so the symbol never appears twice.

The rule is a simple precedence: **an explicit affix wins.** If the consumer provides any of `prefix`, `suffix`, `leadingIcon`, or `trailingIcon`, no affix is derived and the overlay is formatted in full (the descriptive part is **not** stripped, since we did not inject it). This keeps the two concerns separate: a consumer affix is rendered verbatim, never silently combined with or hidden behind a derived one.

When `formatOptions` has no `style`, or has a style that does not carry a descriptive affix
(e.g. `'decimal'`), no affix is derived and the overlay is formatted in full.

Thin wrapper components such as `CurrencyInput` rely on the derivation path: they set
`formatOptions.style: 'currency'`, supply no affix prop, and let `NumberInput` handle all affix
wiring automatically. `CurrencyInput` additionally omits the affix props from its own public
`Props`, so a currency consumer cannot override the derived symbol; the opinion that a currency symbol is fixed lives in the wrapper, not in the primitive.

Consumer `minimumFractionDigits` and `maximumFractionDigits` are used as the baseline for `resolvedMin` and `resolvedMax` respectively, but are always overridden upward by `actualFractionDigits`. This means padding still works (`"1.5"` → `"1.50"` with `minimumFractionDigits: 2`), but rounding never occurs; the overlay always shows at least as many digits as are in the raw value. `resolvedMin` is additionally clamped to `resolvedMax` so it can never
force rounding either.

This overlay `resolvedMax` is deliberately **distinct** from the entry cap
(`maxFractionDigits`): the entry cap limits what can be _typed_ and may be
`Infinity`, whereas `resolvedMax` governs what is _displayed_ and intentionally
exceeds the entry cap for over-cap controlled values. The two must not be
unified.

### Over-cap controlled values

The entry filter prevents the user from typing past the cap, but a controlled
`value` prop can supply any string. A controlled value that is still canonical
but has more fraction digits than the cap (e.g. `"1.999"` with a cap of 2) is:

- Shown verbatim in the overlay (no rounding, display equals value).
- Flagged invalid by the `pattern` backstop (`patternMismatch`), which causes
  the input to match `:user-invalid` once the user has interacted with it.

This upholds the principle that the overlay must never show a value different from what will be submitted. A controlled value that is _not_ canonical is handled by the same principle but shown unchanged with no formatting; see [Non-canonical controlled values](#non-canonical-controlled-values).

### `pattern` backstop

The default `pattern` encodes the cap and is described in full under [Custom validity and `:user-invalid`](#custom-validity-and-user-invalid).

## Why `type="text"` instead of `type="number"`

Native `<input type="number">` has several drawbacks:

- **Inconsistent `value` access.** When the user types an invalid string (e.g.
  `12.3.4`), `input.value` returns an empty string in most browsers. The
  component cannot distinguish "empty" from "invalid".
- **Locale mismatch.** `type="number"` uses the browser's locale for decimal
  separators in some browsers but not others, and `Intl.NumberFormat` output
  does not round-trip through the native parser.
- **Unwanted browser chrome.** Spinner arrows appear by default and must be
  hidden with vendor-prefixed CSS.

NumberInput uses `type="text"` with `inputMode` set to `decimal` or `numeric`
(see [Integer vs decimal entry](#integer-vs-decimal-entry-inputmode)). This
triggers a numeric keyboard on mobile devices without inheriting the native
number input's quirks. Input filtering is handled explicitly in JavaScript.

## Input filtering

A `beforeinput` listener intercepts every keystroke, paste, and drop before the
value changes. The listener is attached directly to the DOM element (not via
React's synthetic event system) to ensure `preventDefault()` works reliably
across browsers. Together these rules keep the value within the
[value contract](#value-contract).

### Keystroke filtering

Each character is tested against an allowed set: digits, the locale's decimal
separator (only when `maxFractionDigits !== 0`), and (when `min` allows
negatives) the minus sign. Characters outside this set are silently rejected.

Additional guards enforce structural rules:

- **Decimals only when allowed.** When `maxFractionDigits` is `0` the decimal
  separator is rejected outright, keeping the value an integer.
- **Precision cap.** A digit is rejected when it would push the fractional part
  beyond `maxFractionDigits`. A cap of `Infinity` disables this check.
- **Single decimal point.** A second decimal separator is blocked by checking
  whether the resulting value (after the selection is replaced) would contain
  more than one `.`.
- **Decimal normalisation.** When the locale's decimal separator differs from
  `.` (e.g. `,` in German), the listener intercepts it and inserts `.`
  instead. The raw value is therefore always parseable by `Number()`.
- **Leading minus only.** A minus sign is blocked unless the caret is at
  position zero and no minus is already present.

### Paste and drop sanitisation

Pasted or dropped content is sanitised before insertion:

1. Group separators (e.g. `,` in English) are stripped.
2. Locale decimal separators are normalised to `.`.
3. Non-numeric characters are removed.
4. The content is **truncated at the first structurally-invalid separator**:
   the integer part and the first fractional group are kept; later groups are
   discarded (`1.2.3.4` → `1.2`). When `maxFractionDigits` is `0`, the
   fractional portion is dropped entirely (`12.99` → `12`).
5. The fractional part is **truncated** to `maxFractionDigits` digits. An
   `Infinity` cap disables truncation.
6. Embedded minus signs (not at position zero) cause the paste to be rejected.
7. The resulting value (existing content with the sanitised fragment spliced
   in) is validated as a whole, rejecting pastes that would produce embedded
   minuses or duplicate decimal points.

### Programmatic value commits

Paste, drop, and decimal-normalisation paths write the value imperatively via
a `commitValue` helper, then dispatch an `input` event. The helper uses the
native `HTMLInputElement` prototype value setter rather than `input.value = …`.
Assigning through `input.value` would update React's internal value tracker,
causing React's `onChange` to dedup the dispatched event and not fire. The
native setter leaves the tracker holding the previous value, so the change is
detected and `onChange` fires exactly once.

## Custom validity and `:user-invalid`

Because the input uses `type="text"`, the browser's native `min`/`max` constraint validation does not apply, so out-of-range values do not trigger `:invalid` or `:user-invalid` on their own. A `useEffect` calls `setCustomValidity()` whenever the value, `min`, or `max` changes; it sets a non-empty validity message when the numeric value falls outside the range, and clears it otherwise. Partial values (`''` and `'-'`) are treated as not-yet-complete and do not trigger an error.

### Validity message tokens

The validity messages are the token strings `'rangeUnderflow'` and `'rangeOverflow'`, mirroring the property names on the native `ValidityState` interface. These tokens are intentionally not English prose:

- They sidestep internationalisation concerns: the component supports a `locale` prop, and hardcoded English messages would be inconsistent.
- Consumers who read `validationMessage` from the DOM (e.g. via a form management library) can map these stable tokens to localised error text.
- The tokens drive the `:user-invalid` CSS pseudo-class; user-facing error messages should be provided via the `NumberControl` wrapper's `errorText` prop.

### `pattern` backstop

A default `pattern` is applied that encodes the precision cap; consumer-supplied `pattern` values take precedence. The pattern is **locale-independent** because it validates the canonical value (always `.`-decimal Latin digits), not the localised overlay.

`pattern` is a **validity-only** backstop: it contributes `patternMismatch` to the constraint-validation API but never blocks entry (the platform does not prevent keystrokes on `pattern`). Its purpose is to flag any value that bypasses the entry filter: most notably a controlled `value` set directly by a consumer that exceeds the precision cap or contains a decimal point in integer mode.

The default `pattern` encodes the cap as follows:

| Cap                    | Pattern             |
| ---------------------- | ------------------- |
| `0` (integer)          | `-?\d*`             |
| Finite `N`             | `-?\d*(\.\d{0,N})?` |
| `Infinity` (unlimited) | `-?\d*\.?\d*`       |

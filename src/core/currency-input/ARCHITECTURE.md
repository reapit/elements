# CurrencyInput Architecture

## Overview

`CurrencyInput` is a thin wrapper over `NumberInput`. It adds one concern: given a `currency` and
`locale`, it derives the localised currency symbol and places it in the correct affix slot
(`prefix` or `suffix`) of the underlying input.

All numeric behaviour — entry filtering, fraction-digit caps, locale-formatted overlay, value
contract, and range validation — is delegated entirely to `NumberInput`. See
[`../number-input/ARCHITECTURE.md`](../number-input/ARCHITECTURE.md) for the numeric contract.

## `locale` and `currency` are orthogonal

`locale` and `currency` control different things and neither can be derived from the other.

**`currency`** (ISO 4217 code, e.g. `'GBP'`, `'USD'`, `'JPY'`) is a property of the _money
itself_. It determines:

- Which symbol is shown (`£`, `$`, `€`).
- The intrinsic fraction-digit precision of the currency: GBP/USD/EUR → 2 decimal places,
  JPY → 0, KWD → 3. These are fixed properties of the currency, independent of locale.

**`locale`** (BCP 47 tag, e.g. `'en-GB'`, `'de-DE'`) describes _how numbers are written for this
reader_. It determines:

- Group and decimal separators (`1,234.50` in en-GB vs `1.234,50` in de-DE).
- The position of the currency symbol (prefix or suffix).
- The exact symbol form used for a foreign currency (`$` vs `US$` vs `CA$`).

The same currency renders differently across locales, and the same locale renders different
currencies differently. Position is a function of _both_:

| `locale` | `currency` | Rendered    | Symbol | Position |
| -------- | ---------- | ----------- | ------ | -------- |
| `en-GB`  | `GBP`      | £1,234.50   | `£`    | prefix   |
| `en-US`  | `USD`      | $1,234.50   | `$`    | prefix   |
| `de-DE`  | `EUR`      | 1.234,50 €  | `€`    | suffix   |
| `sv-SE`  | `SEK`      | 1 234,50 kr | `kr`   | suffix   |
| `ja-JP`  | `JPY`      | ￥1,235     | `￥`   | prefix   |

Note that de-DE and en-GB both use 2 decimal places (a property of EUR and GBP respectively),
but the symbol sits on opposite sides (a property of the locale).

## Why `currency` is required and cannot be inferred from `locale`

Three independent reasons make inference unsafe:

**1. BCP 47 region is optional.** Locale tags are `language[-script][-REGION]`. The region
component — the only part that could map to a currency — is optional. Bare-language tags
(`'en'`, `'de'`, `'fr'`) carry no region at all. The browser's default locale, the fallback when
`locale` is omitted, is frequently just `'en'`.

**2. One language spans many currencies.** `en-GB` → GBP, `en-US` → USD, `en-AU` → AUD,
`en-IE` → EUR. `de-DE` → EUR but `de-CH` → CHF. The same language tag implies no single
currency, even when a region is present.

**3. `Intl` provides no locale-to-currency mapping.** `Intl.NumberFormat` deliberately requires
an explicit `currency` when `style: 'currency'` is used — it throws otherwise. Any locale →
currency table would have to be maintained in userland and would silently drift as countries
change their currency.

The deeper asymmetry is the severity of a wrong value. A wrong `locale` only affects formatting —
`1,234.50` vs `1.234,50`, same number, still legible. A wrong inferred `currency` changes the
_meaning_ of the number: displaying a GBP price in a EUR field is a silent money bug, not a
cosmetic issue.

For these reasons `currency` is required, with no default, and `locale` remains optional
(defaulting to the browser locale when omitted).

## Affix derivation and placement

The currency symbol and its position are derived in a single `Intl.NumberFormat.formatToParts`
pass via `getNumberAffix` in `src/utils/number-format`. The function finds the first descriptive
part (currency symbol, percent sign, or unit — classified by the shared `DESCRIPTIVE_PART_TYPES`
set) and compares its index to the first numeric part to classify the position as `'prefix'` or
`'suffix'`. It routes through the shared `getIntlNumberFormat` factory for graceful fallback and
instance caching.

The derived symbol is always used; there is no consumer override. The symbol is placed at the
locale-correct position (prefix or suffix) — the consumer cannot control which side it sits on,
because that is a function of `currency` and `locale` together.

`leadingIcon` and `trailingIcon` are intentionally not exposed: because the affix position is
locale-dependent, a consumer cannot know which icon slot would be free, so icons are not
a meaningful concept for this component.

The `currencyDisplay` prop (default `'narrowSymbol'`) controls the symbol form and is forwarded
to both `getNumberAffix` and the `formatOptions` passed to `NumberInput`, keeping the affix
symbol and the formatted overlay consistent.

## Overlay and the currency symbol

The formatted overlay (the formatted number shown over the input when unfocused) is
produced by `NumberInput`'s `resolveOverlayValue`. Because `CurrencyInput` passes
`style: 'currency'` in `formatOptions`, a naïve `Intl.NumberFormat.format()` call would include
the currency symbol in the overlay string — duplicating the symbol already rendered by the affix.

`CurrencyInput` therefore passes `showNumberPartsOnly` to `NumberInput`, which causes
`resolveOverlayValue` to use `formatToParts` and drop every part whose type is in
`DESCRIPTIVE_PART_TYPES` (`currency`, `percentSign`, `unit`). Any orphaned literal whitespace
left by the dropped part is removed by a final `.trim()`. The result is that:

- The **affix** renders the currency symbol once (e.g. `£` as a prefix, `€` as a suffix).
- The **overlay** renders only the number (e.g. `1,234.50`), with all currency-aware formatting
  (fraction digits, grouping, decimal separators) intact.

The `DESCRIPTIVE_PART_TYPES` set is shared between `getNumberAffix` and `resolveOverlayValue`
so both sides classify parts consistently.

> **Follow-up:** affix auto-wiring (deriving and placing the symbol automatically from
> `formatOptions`) will move into `NumberInput` in a future change. At that point the temporary
> divergence between `NumberInput` and `CurrencyInput` prop surfaces will be resolved.

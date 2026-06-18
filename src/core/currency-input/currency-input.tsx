import { NumberInput } from '#src/core/number-input'
import { forwardRef, useMemo } from 'react'

export namespace CurrencyInput {
  export interface Props extends Omit<
    NumberInput.Props,
    'formatOptions' | 'inputMode' | 'prefix' | 'suffix' | 'leadingIcon' | 'trailingIcon'
  > {
    /**
     * ISO 4217 currency code (e.g. `'GBP'`, `'USD'`, `'EUR'`).
     *
     * Determines the currency symbol shown in the input and the number of fraction digits
     * accepted (e.g. 2 for GBP/USD/EUR, 0 for JPY). See `ARCHITECTURE.md` for why this
     * cannot be inferred from `locale`.
     */
    currency: string
    /**
     * How the currency symbol is displayed. Defaults to `'narrowSymbol'`, which prefers the
     * shortest unambiguous form (e.g. `'$'` rather than `'US$'`).
     */
    currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay']
    /**
     * How negative amounts are displayed. Defaults to `'standard'` (e.g. `-£5.00`).
     * Use `'accounting'` to display negative values in parentheses (e.g. `(£5.00)`),
     * which is conventional in financial and accounting contexts.
     */
    currencySign?: Intl.NumberFormatOptions['currencySign']
  }
}

/**
 * A monetary input built on top of `NumberInput`. Automatically places the localised currency
 * symbol as a prefix or suffix based on the given `currency` and `locale`.
 *
 * The value contract is identical to `NumberInput`: the value the user edits — and the value
 * `onChange` receives — is a plain numeric string (e.g. `"1234.5"`).
 *
 * The currency symbol is rendered once, as an affix (prefix or suffix), and is omitted from
 * the formatted overlay to avoid duplication.
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInput.Props>(function CurrencyInput(
  { currency, currencyDisplay = 'narrowSymbol', currencySign, locale, ...rest },
  ref,
) {
  const formatOptions = useMemo<Intl.NumberFormatOptions>(
    () => ({ style: 'currency', currency, currencyDisplay, currencySign }),
    [currency, currencyDisplay, currencySign],
  )

  return <NumberInput {...rest} ref={ref} formatOptions={formatOptions} locale={locale} />
})

CurrencyInput.displayName = 'CurrencyInput'

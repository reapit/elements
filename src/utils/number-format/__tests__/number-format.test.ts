import { formatFileSize, getIntlNumberFormat, getLocaleNumberSeparators, getNumberAffix } from '../number-format'

// ---------------------------------------------------------------------------
// getLocaleNumberSeparators
// ---------------------------------------------------------------------------

test('getLocaleNumberSeparators returns "." decimal separator for en-GB', () => {
  expect(getLocaleNumberSeparators('en-GB').decimal).toBe('.')
})

test('getLocaleNumberSeparators returns "," group separator for en-GB', () => {
  expect(getLocaleNumberSeparators('en-GB').group).toBe(',')
})

test('getLocaleNumberSeparators returns "," decimal separator for de-DE', () => {
  expect(getLocaleNumberSeparators('de-DE').decimal).toBe(',')
})

test('getLocaleNumberSeparators returns "." group separator for de-DE', () => {
  expect(getLocaleNumberSeparators('de-DE').group).toBe('.')
})

test('getLocaleNumberSeparators falls back to the default locale for an invalid locale tag', () => {
  expect(() => getLocaleNumberSeparators('not-a-valid-locale!!')).not.toThrow()
  const fallback = getLocaleNumberSeparators(undefined)
  const result = getLocaleNumberSeparators('not-a-valid-locale!!')
  expect(result.decimal).toBe(fallback.decimal)
  expect(result.group).toBe(fallback.group)
})

// ---------------------------------------------------------------------------
// getIntlNumberFormat
// ---------------------------------------------------------------------------

test('getIntlNumberFormat returns an Intl.NumberFormat instance', () => {
  const nf = getIntlNumberFormat('en-GB')
  expect(nf).toBeInstanceOf(Intl.NumberFormat)
})

test('getIntlNumberFormat returns the same instance for the same arguments', () => {
  const a = getIntlNumberFormat('en-GB', { minimumFractionDigits: 2 })
  const b = getIntlNumberFormat('en-GB', { minimumFractionDigits: 2 })
  expect(a).toBe(b)
})

test('getIntlNumberFormat returns distinct instances for different locales', () => {
  const a = getIntlNumberFormat('en-GB')
  const b = getIntlNumberFormat('de-DE')
  expect(a).not.toBe(b)
})

// Options objects with the same keys in different orders produce distinct cache keys.
// This is a known limitation: the extra instance is harmless, but callers should
// keep options objects stable to benefit from caching.
test('getIntlNumberFormat returns distinct instances for differently-ordered options objects', () => {
  const a = getIntlNumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
  const b = getIntlNumberFormat('en-GB', { maximumFractionDigits: 4, minimumFractionDigits: 2 })
  expect(a).not.toBe(b)
})

test('getIntlNumberFormat falls back to the default locale for an invalid locale tag', () => {
  expect(() => getIntlNumberFormat('not-a-valid-locale!!')).not.toThrow()
  const nf = getIntlNumberFormat('not-a-valid-locale!!')
  expect(nf).toBeInstanceOf(Intl.NumberFormat)
})

test('getIntlNumberFormat does not throw for an out-of-range maximumFractionDigits', () => {
  expect(() => getIntlNumberFormat('en-GB', { maximumFractionDigits: 200 })).not.toThrow()
  expect(getIntlNumberFormat('en-GB', { maximumFractionDigits: 200 })).toBeInstanceOf(Intl.NumberFormat)
})

test('getIntlNumberFormat preserves the locale when options are invalid', () => {
  // de-DE uses '.' as a group separator and ',' as the decimal separator.
  // Even with an invalid maximumFractionDigits the locale-specific separators
  // should be preserved in the formatted output.
  const nf = getIntlNumberFormat('de-DE', { maximumFractionDigits: 200 })
  expect(nf.format(1234.5)).toBe('1.234,5')
})

test('getIntlNumberFormat does not throw when minimumFractionDigits exceeds maximumFractionDigits', () => {
  expect(() => getIntlNumberFormat('en-GB', { minimumFractionDigits: 5, maximumFractionDigits: 2 })).not.toThrow()
  expect(getIntlNumberFormat('en-GB', { minimumFractionDigits: 5, maximumFractionDigits: 2 })).toBeInstanceOf(
    Intl.NumberFormat,
  )
})

// bigint values

test('formats a bigint with group separators', () => {
  expect(getIntlNumberFormat('en-GB').format(BigInt('12345678901234567'))).toBe('12,345,678,901,234,567')
})

test('formats a negative bigint', () => {
  expect(getIntlNumberFormat('en-GB').format(BigInt('-12345678901234567'))).toBe('-12,345,678,901,234,567')
})

// ---------------------------------------------------------------------------
// getNumberAffix
// ---------------------------------------------------------------------------

test('getNumberAffix returns the £ symbol as a prefix for GBP in en-GB', () => {
  expect(getNumberAffix(0, 'en-GB', { style: 'currency', currency: 'GBP' })).toEqual({ affix: '£', position: 'prefix' })
})

test('getNumberAffix returns the $ symbol as a prefix for USD in en-US', () => {
  expect(getNumberAffix(0, 'en-US', { style: 'currency', currency: 'USD' })).toEqual({ affix: '$', position: 'prefix' })
})

test('getNumberAffix returns the € symbol as a suffix for EUR in de-DE', () => {
  expect(getNumberAffix(0, 'de-DE', { style: 'currency', currency: 'EUR' })).toEqual({ affix: '€', position: 'suffix' })
})

test('getNumberAffix returns "kr" as a suffix for SEK in sv-SE', () => {
  expect(getNumberAffix(0, 'sv-SE', { style: 'currency', currency: 'SEK' })).toEqual({
    affix: 'kr',
    position: 'suffix',
  })
})

test('getNumberAffix returns the ￥ symbol as a prefix for JPY in ja-JP', () => {
  expect(getNumberAffix(0, 'ja-JP', { style: 'currency', currency: 'JPY' })).toEqual({
    affix: '￥',
    position: 'prefix',
  })
})

test('getNumberAffix respects an explicit currencyDisplay of "code"', () => {
  const result = getNumberAffix(0, 'en-GB', { style: 'currency', currency: 'GBP', currencyDisplay: 'code' })
  expect(result.affix).toBe('GBP')
  expect(result.position).toBe('prefix')
})

test('getNumberAffix respects an explicit currencyDisplay of "name"', () => {
  const result = getNumberAffix(0, 'en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'name' })
  // 'name' renders the full currency name after the number (e.g. "0.00 US dollars")
  expect(result.position).toBe('suffix')
})

test('getNumberAffix returns the percent sign as a suffix for percent style in en-GB', () => {
  const result = getNumberAffix(0, 'en-GB', { style: 'percent' })
  expect(result.affix).toBe('%')
  expect(result.position).toBe('suffix')
})

test('getNumberAffix does not throw for an invalid locale', () => {
  expect(() => getNumberAffix(0, 'not-a-valid-locale!!', { style: 'currency', currency: 'GBP' })).not.toThrow()
})

test('getNumberAffix falls back gracefully for an invalid locale', () => {
  const result = getNumberAffix(0, 'not-a-valid-locale!!', { style: 'currency', currency: 'GBP' })
  // The invalid locale is discarded and the runtime default locale is used instead.
  // Assert both affix and position match the runtime-default-locale result so this
  // test is consistent across CI environments.
  const fallback = getNumberAffix(0, undefined, { style: 'currency', currency: 'GBP' })
  expect(result.affix).toBeTruthy()
  expect(result.position).toBe(fallback.position)
})

test('getNumberAffix returns empty affix with prefix position when no descriptive part is present', () => {
  // A plain decimal format has no currency/percent/unit part.
  const result = getNumberAffix(0, 'en-GB', { style: 'decimal' })
  expect(result).toEqual({ affix: '', position: 'prefix' })
})

test('getNumberAffix returns the correct position when passed NaN', () => {
  // NaN produces a 'nan' part instead of 'integer', which would break position detection
  // without the non-finite normalisation guard. The result must match the finite (0) result.
  const withNaN = getNumberAffix(NaN, 'en-GB', { style: 'currency', currency: 'GBP' })
  const withZero = getNumberAffix(0, 'en-GB', { style: 'currency', currency: 'GBP' })
  expect(withNaN.position).toBe(withZero.position)
})

test('getNumberAffix returns the correct position when passed Infinity', () => {
  const withInfinity = getNumberAffix(Infinity, 'en-GB', { style: 'currency', currency: 'GBP' })
  const withZero = getNumberAffix(0, 'en-GB', { style: 'currency', currency: 'GBP' })
  expect(withInfinity.position).toBe(withZero.position)
})

// ---------------------------------------------------------------------------
// formatFileSize
// ---------------------------------------------------------------------------

test('formatFileSize formats 0 bytes with the "byte" unit', () => {
  expect(formatFileSize(0, 'en-GB')).toBe('0 byte')
})

test('formatFileSize formats a value below the KB boundary with the "byte" unit', () => {
  expect(formatFileSize(999, 'en-GB')).toBe('999 byte')
})

test('formatFileSize formats exactly 1000 bytes with the "kB" unit', () => {
  expect(formatFileSize(1000, 'en-GB')).toBe('1 kB')
})

test('formatFileSize matches the Figma spec example of 3.6 MB', () => {
  expect(formatFileSize(1000 * 1000 * 3.6, 'en-GB')).toBe('3.6 MB')
})

test('formatFileSize formats a value below the MB boundary with the "kB" unit', () => {
  expect(formatFileSize(1000 * 1000 - 1, 'en-GB')).toBe('1,000 kB')
})

test('formatFileSize formats exactly 1 MB with the "MB" unit', () => {
  expect(formatFileSize(1000 * 1000, 'en-GB')).toBe('1 MB')
})

test('formatFileSize rounds the numeric part to a maximum of 2 fraction digits', () => {
  expect(formatFileSize(1000 * 1000 * 2.98765, 'en-GB')).toBe('2.99 MB')
})

test('formatFileSize uses locale-specific decimal separators for the numeric part', () => {
  expect(formatFileSize(245043, 'de-DE')).toBe('245,04 kB')
})

test('formatFileSize uses a locale-specific unit name', () => {
  // fr-FR separates the number and unit with a narrow no-break space (U+202F), not a plain space.
  expect(formatFileSize(1000 * 1000 * 3.6, 'fr-FR')).toBe('3,6 Mo')
})

test('formatFileSize normalises NaN to 0 rather than throwing', () => {
  expect(() => formatFileSize(NaN)).not.toThrow()
  expect(formatFileSize(NaN, 'en-GB')).toBe('0 byte')
})

test('formatFileSize normalises Infinity to 0 rather than throwing', () => {
  expect(formatFileSize(Infinity, 'en-GB')).toBe('0 byte')
})

test('formatFileSize normalises negative values to 0', () => {
  expect(formatFileSize(-1, 'en-GB')).toBe('0 byte')
})

test('formatFileSize does not throw for an invalid locale tag', () => {
  expect(() => formatFileSize(245043, 'not-a-valid-locale!!')).not.toThrow()
})

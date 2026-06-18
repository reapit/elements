import { getIntlNumberFormat, getLocaleNumberSeparators } from '../number-format'

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

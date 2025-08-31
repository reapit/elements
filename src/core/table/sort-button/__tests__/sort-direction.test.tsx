import { parseSortDirection, getNextSortDirection } from '../sort-direction'

describe('parseSortDirection', () => {
  test('returns "ascending" when value is "ascending"', () => {
    expect(parseSortDirection('ascending')).toBe('ascending')
  })

  test('returns "descending" when value is "ascending"', () => {
    expect(parseSortDirection('descending')).toBe('descending')
  })

  test('returns "none" for all other values', () => {
    expect(parseSortDirection('none')).toBe('none')

    // invalid sort directions
    expect(parseSortDirection(0)).toBe('none')
    expect(parseSortDirection(null)).toBe('none')
    expect(parseSortDirection(undefined)).toBe('none')
    expect(parseSortDirection('invalid')).toBe('none')
  })
})

describe('getNextSortDirection', () => {
  test('returns "ascending" when current value is "descending"', () => {
    expect(getNextSortDirection('descending')).toBe('ascending')
  })

  test('returns "descending" when current value is "ascending"', () => {
    expect(getNextSortDirection('ascending')).toBe('descending')
  })

  test('returns "descending" for all other current values', () => {
    expect(getNextSortDirection('none')).toBe('descending')

    // invalid sort directions
    expect(getNextSortDirection(0)).toBe('descending')
    expect(getNextSortDirection(null)).toBe('descending')
    expect(getNextSortDirection(undefined)).toBe('descending')
    expect(getNextSortDirection('invalid')).toBe('descending')
  })
})

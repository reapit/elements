import { renderHook } from '@testing-library/react'
import { useComboboxSelectionSummary } from '../use-selection-summary'

import type { ComboboxSelectedOption } from '../use-selected-options'

test('returns placeholder when selections array is empty', () => {
  const { result } = renderHook(() => useComboboxSelectionSummary([], 'Select an option'))

  expect(result.current).toBe('Select an option')
})

test('returns single selection label when exactly one selection exists', () => {
  const selections: ComboboxSelectedOption[] = [{ label: 'Apple', value: 'apple' }]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('Apple')
})

test('returns count string when two selections exist', () => {
  const selections: ComboboxSelectedOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('2 selected')
})

test('returns count string when three selections exist', () => {
  const selections: ComboboxSelectedOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('3 selected')
})

test('returns count string when many selections exist', () => {
  const selections: ComboboxSelectedOption[] = Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }))

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('10 selected')
})

test('returns placeholder when single selection has empty string label', () => {
  const selections: ComboboxSelectedOption[] = [{ label: '', value: 'empty' }]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select an option'))

  expect(result.current).toBe('Select an option')
})

test('returns custom placeholder text', () => {
  const { result } = renderHook(() => useComboboxSelectionSummary([], 'Choose your favorite'))

  expect(result.current).toBe('Choose your favorite')
})

test('uses custom placeholder when single selection has empty label', () => {
  const selections: ComboboxSelectedOption[] = [{ label: '', value: 'empty' }]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Pick one'))

  expect(result.current).toBe('Pick one')
})

test('returns single selection label with special characters', () => {
  const selections: ComboboxSelectedOption[] = [{ label: 'Option & "Special"', value: 'special' }]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('Option & "Special"')
})

test('returns single selection label with numbers', () => {
  const selections: ComboboxSelectedOption[] = [{ label: '123 Main Street', value: 'address' }]

  const { result } = renderHook(() => useComboboxSelectionSummary(selections, 'Select'))

  expect(result.current).toBe('123 Main Street')
})

test('memoizes result when selections reference changes but content is the same', () => {
  const selections1: ComboboxSelectedOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]

  const { result, rerender } = renderHook(
    ({ selections, placeholder }) => useComboboxSelectionSummary(selections, placeholder),
    { initialProps: { selections: selections1, placeholder: 'Select' } },
  )

  const firstResult = result.current
  expect(firstResult).toBe('2 selected')

  const selections2: ComboboxSelectedOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]

  rerender({ selections: selections2, placeholder: 'Select' })

  expect(result.current).toBe('2 selected')
})

test('updates result when selections change', () => {
  const selections1: ComboboxSelectedOption[] = [{ label: 'Apple', value: 'apple' }]

  const { result, rerender } = renderHook(
    ({ selections, placeholder }) => useComboboxSelectionSummary(selections, placeholder),
    { initialProps: { selections: selections1, placeholder: 'Select' } },
  )

  expect(result.current).toBe('Apple')

  const selections2: ComboboxSelectedOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]

  rerender({ selections: selections2, placeholder: 'Select' })

  expect(result.current).toBe('2 selected')
})

import { act, renderHook } from '@testing-library/react'
import { getListboxValue } from '../dom-helpers'
import { useListboxSelectState } from '../use-select-state'

import type { ChangeEvent } from 'react'

vi.mock('../dom-helpers')

const mockGetListboxValue = vi.mocked(getListboxValue)

test('returns value and a change handler', () => {
  const { result } = renderHook(() => useListboxSelectState({ multiple: true }))
  const [value, onChange] = result.current
  expect(value).toEqual([])
  expect(onChange).toEqual(expect.any(Function))
})

test('uses defaultValue when provided as array', () => {
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: ['a', 'b'], multiple: true }))
  const [value] = result.current
  expect(value).toEqual(['a', 'b'])
})

test('uses defaultValue when provided as string', () => {
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: 'a', multiple: false }))
  const [value] = result.current
  expect(value).toEqual(['a'])
})

test('uses controlled value when provided as array', () => {
  const { result } = renderHook(() => useListboxSelectState({ value: ['x', 'y'], multiple: true }))
  const [value] = result.current
  expect(value).toEqual(['x', 'y'])
})

test('uses controlled value when provided as string', () => {
  const { result } = renderHook(() => useListboxSelectState({ value: 'x', multiple: false }))
  const [value] = result.current
  expect(value).toEqual(['x'])
})

test('controlled value always takes precedence', () => {
  const { result } = renderHook(() => useListboxSelectState({ value: ['x'], defaultValue: ['a', 'b'], multiple: true }))
  const [value] = result.current
  expect(value).toEqual(['x'])
})

test('returns only first value when multiple is false', () => {
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: ['a', 'b', 'c'], multiple: false }))
  const [value] = result.current
  expect(value).toEqual(['a'])
})

test('returns all values when multiple is true', () => {
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: ['a', 'b', 'c'], multiple: true }))
  const [value] = result.current
  expect(value).toEqual(['a', 'b', 'c'])
})

test('calls provided onChange when change handler is invoked', () => {
  const onChange = vi.fn()
  mockGetListboxValue.mockReturnValue(['new'])
  const { result } = renderHook(() => useListboxSelectState({ multiple: true, onChange }))
  const [, handleChange] = result.current

  const mockEvent = { currentTarget: {} } as ChangeEvent<HTMLSelectElement>

  act(() => {
    handleChange(mockEvent)
  })

  expect(onChange).toHaveBeenCalledWith(mockEvent)
})

test('updates internal state when change handler is invoked', () => {
  mockGetListboxValue.mockReturnValue(['new', 'values'])
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: ['old'], multiple: true }))

  const mockEvent = { currentTarget: {} } as ChangeEvent<HTMLSelectElement>

  act(() => {
    const [, handleChange] = result.current
    handleChange(mockEvent)
  })

  const [value] = result.current
  expect(value).toEqual(['new', 'values'])
})

test('normalizes string defaultValue to array internally', () => {
  const { result } = renderHook(() => useListboxSelectState({ defaultValue: 'single', multiple: false }))
  const [value] = result.current
  expect(value).toEqual(['single'])
})

test('normalizes string controlled value to array internally', () => {
  const { result } = renderHook(() => useListboxSelectState({ value: 'single', multiple: false }))
  const [value] = result.current
  expect(value).toEqual(['single'])
})

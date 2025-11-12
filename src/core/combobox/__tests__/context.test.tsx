import { ComboboxContext, useComboboxContext } from '../context'
import { renderHook } from '@testing-library/react'

import type { ReactNode } from 'react'

const mockContextValue: ComboboxContext.Value = {
  buttonId: 'test-button-id',
  disabled: false,
  listboxId: 'test-listbox-id',
  popupId: 'test-popup-id',
  required: false,
}

test('throws error when useComboboxContext is called outside a Combobox', () => {
  expect(() => {
    renderHook(() => useComboboxContext())
  }).toThrow('useComboboxContext requires a Combobox ancestor')
})

test('returns context value when used within ComboboxContext.Provider', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper(mockContextValue),
  })

  expect(result.current).toEqual(mockContextValue)
})

test('returns correct buttonId from context', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper({ ...mockContextValue, buttonId: 'custom-button-id' }),
  })

  expect(result.current.buttonId).toBe('custom-button-id')
})

test('returns correct disabled state from context', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper({ ...mockContextValue, disabled: true }),
  })

  expect(result.current.disabled).toBe(true)
})

test('returns correct listboxId from context', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper({ ...mockContextValue, listboxId: 'custom-listbox-id' }),
  })

  expect(result.current.listboxId).toBe('custom-listbox-id')
})

test('returns correct popupId from context', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper({ ...mockContextValue, popupId: 'custom-popup-id' }),
  })

  expect(result.current.popupId).toBe('custom-popup-id')
})

test('returns correct required state from context', () => {
  const { result } = renderHook(() => useComboboxContext(), {
    wrapper: createWrapper({ ...mockContextValue, required: true }),
  })

  expect(result.current.required).toBe(true)
})

function createWrapper(contextValue: ComboboxContext.Value) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ComboboxContext.Provider value={contextValue}>{children}</ComboboxContext.Provider>
  }
}

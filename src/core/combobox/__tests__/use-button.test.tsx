import { ComboboxContext } from '../context'
import { fireEvent, renderHook } from '@testing-library/react'
import { openComboboxPopup, useComboboxPopupState } from '../popup-dialog'
import { useComboboxButton } from '../use-button'
import { useComboboxSelectedOptions } from '../use-selected-options'
import { useComboboxSelectionSummary } from '../use-selection-summary'

import type { ReactNode } from 'react'

vi.mock('../combobox-popup')
vi.mock('../popup-dialog')
vi.mock('../use-selected-options')
vi.mock('../use-selection-summary')

beforeEach(() => {
  vi.mocked(useComboboxPopupState).mockReturnValue(false)
  vi.mocked(useComboboxSelectedOptions).mockReturnValue(mockSelections)
  vi.mocked(useComboboxSelectionSummary).mockReturnValue('2 selected')
})

test('throws error when used outside ComboboxContext', () => {
  expect(() => {
    renderHook(() => useComboboxButton({ placeholder: 'Select' }))
  }).toThrow('useComboboxContext requires a Combobox ancestor')
})

test('returns button props with correct aria-controls', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.props['aria-controls']).toBe('test-popup-id')
})

test('returns button props with correct aria-expanded when popup is closed', () => {
  vi.mocked(useComboboxPopupState).mockReturnValue(false)

  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.props['aria-expanded']).toBe(false)
})

test('returns button props with correct aria-expanded when popup is open', () => {
  vi.mocked(useComboboxPopupState).mockReturnValue(true)

  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.props['aria-expanded']).toBe(true)
})

test('returns button props with aria-required false when not required', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper({ ...mockContextValue, required: false }),
  })
  expect(result.current.props['aria-required']).toBe(false)
})

test('returns button props with aria-required true when required', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper({ ...mockContextValue, required: true }),
  })
  expect(result.current.props['aria-required']).toBe(true)
})

test('returns button props with disabled false when not disabled', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper({ ...mockContextValue, disabled: false }),
  })
  expect(result.current.props.disabled).toBe(false)
})

test('returns button props with disabled true when disabled', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper({ ...mockContextValue, disabled: true }),
  })
  expect(result.current.props.disabled).toBe(true)
})

test('returns button props with correct id', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.props.id).toBe('test-button-id')
})

test('returns selections from useComboboxSelectedOptions', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.selections).toBe(mockSelections)
})

test('calls useComboboxSelectedOptions with listboxId', () => {
  renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('test-listbox-id')
})

test('returns selectionSummary from useComboboxSelectionSummary', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(result.current.selectionSummary).toBe('2 selected')
})

test('calls useComboboxSelectionSummary with selections and placeholder', () => {
  renderHook(() => useComboboxButton({ placeholder: 'Choose option' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(useComboboxSelectionSummary).toHaveBeenCalledWith(mockSelections, 'Choose option')
})

test('calls showComboboxPopup when button is clicked', () => {
  const { result } = renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })

  const button = document.createElement('button')
  fireEvent.click(button, { currentTarget: button })

  result.current.props.onClick({ currentTarget: button } as any)

  expect(openComboboxPopup).toHaveBeenCalledWith('test-popup-id')
})

test('calls consumer onClick when button is clicked', () => {
  const onClick = vi.fn()
  const { result } = renderHook(() => useComboboxButton({ onClick, placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })

  const button = document.createElement('button')
  const event = { currentTarget: button } as any

  result.current.props.onClick(event)

  expect(onClick).toHaveBeenCalledWith(event)
})

test('calls useComboboxPopupState with popupId', () => {
  renderHook(() => useComboboxButton({ placeholder: 'Select' }), {
    wrapper: createWrapper(mockContextValue),
  })
  expect(useComboboxPopupState).toHaveBeenCalledWith('test-popup-id')
})

function createWrapper(contextValue: ComboboxContext.Value) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ComboboxContext.Provider value={contextValue}>{children}</ComboboxContext.Provider>
  }
}

const mockContextValue: ComboboxContext.Value = {
  buttonId: 'test-button-id',
  disabled: false,
  listboxId: 'test-listbox-id',
  popupId: 'test-popup-id',
  required: false,
}

const mockSelections = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
]

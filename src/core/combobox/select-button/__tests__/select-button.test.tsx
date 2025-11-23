import { ComboboxSelectButton } from '../select-button'
import { render, screen } from '@testing-library/react'
import { useComboboxContext } from '../../context'
import { useComboboxSelectedOptions } from '../../use-selected-options'

import type { ComboboxContext } from '../../context'

vi.mock('../../context')
vi.mock('../../use-selected-options')

beforeEach(() => {
  vi.mocked(useComboboxContext).mockReturnValue(mockContextValue)
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
})

test('renders a combobox element', () => {
  render(<ComboboxSelectButton />)
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays placeholder text when no selections exist', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
  render(<ComboboxSelectButton placeholder="Select an option" />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Select an option')
})

test('displays selection summary when selections exist', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectButton />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Option 1')
})

test('renders toggle popup button when no selections exist', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('renders clear button when selections exist', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('passes listboxId to clear button aria-controls', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    listboxId: 'custom-listbox-id',
  })
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toHaveAttribute('aria-controls', 'custom-listbox-id')
})

test('passes popupId to toggle button aria-controls', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    popupId: 'custom-popup-id',
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('passes disabled state to clear button', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    disabled: true,
  })
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled()
})

test('passes disabled state to toggle popup button', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    disabled: true,
  })
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeDisabled()
})

test('uses size specified by ComboboxContext', () => {
  const { container } = render(<ComboboxSelectButton />)
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('forwards additional props to the combobox element', () => {
  render(<ComboboxSelectButton data-testid="my-select-button" />)
  expect(screen.getByTestId('my-select-button')).toBe(screen.getByRole('combobox'))
})

const mockContextValue: ComboboxContext.Value = {
  buttonId: 'test-button-id',
  disabled: false,
  listboxId: 'test-listbox-id',
  multiple: false,
  popupId: 'test-popup-id',
  required: false,
  size: 'medium',
}

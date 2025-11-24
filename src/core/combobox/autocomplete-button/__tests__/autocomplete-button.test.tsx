import { ComboboxAutocompleteButton } from '../index'

import { render, screen } from '@testing-library/react'
import { useComboboxButtonProps } from '../../use-button-props'
import { useComboboxContext } from '../../context'

import type { ComboboxContext } from '../../context'
import type { useComboboxButtonProps as UseComboboxButtonType } from '../../use-button-props'

vi.mock('../../use-button-props')
vi.mock('../../context')

beforeEach(() => {
  vi.mocked(useComboboxContext).mockReturnValue(mockContextValue)
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
})

test('renders a combobox element', () => {
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays placeholder text when no selections exist', () => {
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
  render(<ComboboxAutocompleteButton placeholder="Search..." />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Search...')
})

test('displays placeholder text when selections exist', () => {
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Search...')
})

test('renders search icon', () => {
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
  render(<ComboboxAutocompleteButton />)
  const button = screen.getByRole('combobox')
  const searchIcon = button.querySelector('svg[aria-hidden="true"]')
  expect(searchIcon).toBeVisible()
})

test('renders "open popup" button', () => {
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('passes popupId to "open popup" aria-controls', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    popupId: 'popup-id',
  })
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toHaveAttribute('aria-controls', 'popup-id')
})

test('passes disabled state to "open popup" button', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    disabled: true,
  })
  vi.mocked(useComboboxButtonProps).mockReturnValue(mockButtonHookOutput)
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeDisabled()
})

test('calls useComboboxButton with onClick handler', () => {
  const onClick = vi.fn()
  render(<ComboboxAutocompleteButton onClick={onClick} />)
  expect(useComboboxButtonProps).toHaveBeenCalledWith({ onClick })
})

test('uses size specified by ComboboxContext', () => {
  const { container } = render(<ComboboxAutocompleteButton />)
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('forwards additional props to underlying element', () => {
  render(<ComboboxAutocompleteButton data-testid="my-autocomplete-button" />)
  expect(screen.getByTestId('my-autocomplete-button')).toBeVisible()
})

const mockContextValue: ComboboxContext.Value = {
  buttonId: 'test-button-id',
  disabled: false,
  listboxId: 'test-listbox-id',
  multiple: true,
  popupId: 'test-popup-id',
  required: false,
  size: 'medium',
}

const mockButtonHookOutput: ReturnType<typeof UseComboboxButtonType> = {
  'aria-controls': 'test-popup-id',
  'aria-expanded': false,
  'aria-required': false,
  disabled: false,
  id: 'test-button-id',
  onClick: vi.fn(),
}

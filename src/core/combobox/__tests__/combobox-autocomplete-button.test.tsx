import { ComboboxAutocompleteButton } from '../combobox-autocomplete-button'

import { render, screen } from '@testing-library/react'
import { useComboboxButton } from '../use-button'
import { useComboboxContext } from '../context'

import type { ComboboxContext } from '../context'
import type { useComboboxButton as UseComboboxButtonType } from '../use-button'

vi.mock('../use-button')
vi.mock('../context')
vi.mock('#src/utils/listbox')

beforeEach(() => {
  vi.mocked(useComboboxContext).mockReturnValue(mockContextValue)
  vi.mocked(useComboboxButton).mockReturnValue(mockButtonHookOutput)
})

test('renders a combobox element', () => {
  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays placeholder text when no selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
    selectionSummary: 'Search...',
  })

  render(<ComboboxAutocompleteButton placeholder="Search..." />)
  expect(screen.getByText('Search...')).toBeVisible()
})

test('displays selection summary when selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
    selectionSummary: 'Option 1',
  })

  render(<ComboboxAutocompleteButton />)
  expect(screen.getByText('Option 1')).toBeVisible()
})

test('renders search icon when no selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
  })

  render(<ComboboxAutocompleteButton />)
  const button = screen.getByRole('combobox')
  const searchIcon = button.querySelector('svg[aria-hidden="true"]')
  expect(searchIcon).toBeVisible()
})

test('does not render search icon when selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  render(<ComboboxAutocompleteButton />)
  const button = screen.getByRole('combobox')
  const searchIcon = button.querySelector('svg[aria-hidden="true"]')
  expect(searchIcon).not.toBeInTheDocument()
})

test('renders clear button when selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('does not render clear button when no selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
  })

  render(<ComboboxAutocompleteButton />)
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('passes listboxId to clear button aria-controls', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    listboxId: 'custom-listbox-id',
  })
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toHaveAttribute('aria-controls', 'custom-listbox-id')
})

test('passes disabled state to clear button', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    disabled: true,
  })
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  render(<ComboboxAutocompleteButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled()
})

test('calls useComboboxButton with onClick handler', () => {
  const onClick = vi.fn()
  render(<ComboboxAutocompleteButton onClick={onClick} />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick,
    placeholder: 'Search...',
  })
})

test('calls useComboboxButton with custom placeholder', () => {
  render(<ComboboxAutocompleteButton placeholder="Find items..." />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick: undefined,
    placeholder: 'Find items...',
  })
})

test('uses default placeholder when not provided', () => {
  render(<ComboboxAutocompleteButton />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick: undefined,
    placeholder: 'Search...',
  })
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
  popupId: 'test-popup-id',
  required: false,
  size: 'medium',
}

const mockButtonHookOutput: ReturnType<typeof UseComboboxButtonType> = {
  props: {
    'aria-controls': 'test-popup-id',
    'aria-expanded': false,
    'aria-required': false,
    disabled: false,
    id: 'test-button-id',
    onClick: vi.fn(),
  },
  selections: [],
  selectionSummary: 'Search...',
}

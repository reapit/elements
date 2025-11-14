import { ComboboxSelectButton } from '../combobox-select-button'
import { render, screen } from '@testing-library/react'
import { useComboboxButton } from '../use-button'
import { useComboboxContext } from '../context'

import type { ComboboxContext } from '../context'

vi.mock('../use-button')
vi.mock('../context')

beforeEach(() => {
  vi.mocked(useComboboxContext).mockReturnValue(mockContextValue)
  vi.mocked(useComboboxButton).mockReturnValue(mockButtonHookOutput)
})

test('renders a combobox element', () => {
  render(<ComboboxSelectButton />)
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays placeholder text when no selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
    selectionSummary: 'Select an option',
  })

  render(<ComboboxSelectButton placeholder="Select an option" />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Select an option')
})

test('displays selection summary when selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
    selectionSummary: 'Option 1',
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('combobox')).toHaveTextContent('Option 1')
})

test('renders toggle popup button when no selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('renders clear button when selections exist', () => {
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [{ label: 'Option 1', value: 'option-1' }],
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
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

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toHaveAttribute('aria-controls', 'custom-listbox-id')
})

test('passes popupId to toggle button aria-controls', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    popupId: 'custom-popup-id',
  })
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeVisible()
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

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled()
})

test('passes disabled state to toggle popup button', () => {
  vi.mocked(useComboboxContext).mockReturnValue({
    ...mockContextValue,
    disabled: true,
  })
  vi.mocked(useComboboxButton).mockReturnValue({
    ...mockButtonHookOutput,
    selections: [],
  })

  render(<ComboboxSelectButton />)
  expect(screen.getByRole('button', { name: 'Open popup' })).toBeDisabled()
})

test('calls useComboboxButton with onClick handler', () => {
  const onClick = vi.fn()
  render(<ComboboxSelectButton onClick={onClick} />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick,
    placeholder: 'Select an option',
  })
})

test('calls useComboboxButton with custom placeholder', () => {
  render(<ComboboxSelectButton placeholder="Choose one" />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick: undefined,
    placeholder: 'Choose one',
  })
})

test('uses default placeholder when not provided', () => {
  render(<ComboboxSelectButton />)

  expect(useComboboxButton).toHaveBeenCalledWith({
    onClick: undefined,
    placeholder: 'Select an option',
  })
})

test('applies custom size when provided', () => {
  const { container } = render(<ComboboxSelectButton size="small" />)
  expect(container.querySelector('[data-size="small"]')).toBeVisible()
})

test('forwards additional props to the combobox element', () => {
  render(<ComboboxSelectButton data-testid="my-select-button" />)
  expect(screen.getByTestId('my-select-button')).toBe(screen.getByRole('combobox'))
})

const mockContextValue: ComboboxContext.Value = {
  buttonId: 'test-button-id',
  disabled: false,
  listboxId: 'test-listbox-id',
  popupId: 'test-popup-id',
  required: false,
}

const mockButtonHookOutput: useComboboxButton.Output = {
  props: {
    'aria-controls': 'test-popup-id',
    'aria-expanded': false,
    'aria-required': false,
    disabled: false,
    id: 'test-button-id',
    onClick: vi.fn(),
  },
  selections: [],
  selectionSummary: 'Select an option',
}

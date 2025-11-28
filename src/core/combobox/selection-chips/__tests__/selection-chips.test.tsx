import { ComboboxSelectionChips } from '../selection-chips'
import { fireEvent, render, screen } from '@testing-library/react'
import { setListboxOptionSelectedState } from '#src/utils/listbox'
import { useComboboxSelectedOptions } from '../../use-selected-options'

vi.mock('#src/utils/listbox')
vi.mock('../../use-selected-options')

test('renders nothing when no options are selected', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
  const { container } = render(<ComboboxSelectionChips listboxId="test-listbox" />)
  expect(container.firstChild).toBeNull()
})

test('renders a chip for each selected option', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
  ])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)
  expect(screen.getByText('Option 1')).toBeVisible()
  expect(screen.getByText('Option 2')).toBeVisible()
})

test('renders chips with the correct labels', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Custom Label', value: 'value-1' },
    { label: 'Another Label', value: 'value-2' },
  ])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)
  expect(screen.getByText('Custom Label')).toBeVisible()
  expect(screen.getByText('Another Label')).toBeVisible()
})

test('renders chips with selection variant', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)
  const chip = screen.getByText('Option 1').closest('button')
  expect(chip).toHaveAttribute('data-variant', 'selection')
})

test('renders chips with aria-controls pointing to the listbox', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectionChips listboxId="my-listbox" />)
  const chip = screen.getByText('Option 1').closest('button')
  expect(chip).toHaveAttribute('aria-controls', 'my-listbox')
})

test('deselects option when chip is clicked', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)

  fireEvent.click(screen.getByText('Option 1'))

  expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-1', expect.any(Function))
})

test('passes setter function that returns false to deselect option', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)

  fireEvent.click(screen.getByText('Option 1'))

  const setterFunction = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2]
  const mockSelectElement = document.createElement('select') as HTMLSelectElement
  expect(setterFunction(true, mockSelectElement)).toBe(false)
  expect(setterFunction(false, mockSelectElement)).toBe(false)
})

test('deselects correct option when multiple chips exist', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)

  fireEvent.click(screen.getByText('Option 2'))

  expect(setListboxOptionSelectedState).toHaveBeenCalledWith('test-listbox', 'option-2', expect.any(Function))
})

test('renders single selected option', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Single Option', value: 'single' }])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)
  expect(screen.getByText('Single Option')).toBeVisible()
})

test('renders many selected options', () => {
  const options = Array.from({ length: 10 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }))
  vi.mocked(useComboboxSelectedOptions).mockReturnValue(options)
  render(<ComboboxSelectionChips listboxId="test-listbox" />)

  options.forEach((option) => {
    expect(screen.getByText(option.label)).toBeVisible()
  })
})

test('passes listboxId to useComboboxSelectedOptions hook', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
  render(<ComboboxSelectionChips listboxId="custom-listbox-id" />)
  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('custom-listbox-id', undefined)
})

test('passes defaultOptions to useComboboxSelectedOptions hook', () => {
  const defaultOptions = [{ label: 'Option 1', value: 'option-1' }]
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])
  render(<ComboboxSelectionChips listboxId="test" defaultOptions={defaultOptions} />)
  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('test', defaultOptions)
})

test('renders each chip in a list item element', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
  ])
  render(<ComboboxSelectionChips listboxId="test-listbox" />)
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
})

test('disables all chips when disabled', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
  ])
  render(<ComboboxSelectionChips disabled listboxId="test" />)
  const buttons = screen.getAllByRole('button', { hidden: true })
  expect(buttons[0]).toBeDisabled()
  expect(buttons[1]).toBeDisabled()
})

test('forwards additional ChipGroup props to the underlying ChipGroup component', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])
  render(<ComboboxSelectionChips listboxId="test-listbox" data-testid="chip-group" flow="nowrap" />)
  const chipGroup = screen.getByTestId('chip-group')
  expect(chipGroup).toBeVisible()
  expect(chipGroup).toHaveAttribute('data-flow', 'nowrap')
})

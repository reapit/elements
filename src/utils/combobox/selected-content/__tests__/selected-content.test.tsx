import { ComboboxDefaultOptionsContext } from '../../default-options-context'
import { ComboboxSelectedContent } from '../selected-content'
import { render, screen } from '@testing-library/react'
import { useComboboxSelectedOptions } from '../../use-selected-options'
import { vi } from 'vitest'

vi.mock('../../use-selected-options')

test('renders null when no options are selected', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  const { container } = render(<ComboboxSelectedContent listboxId="test-listbox" />)

  expect(container.firstChild).toBeNull()
})

test('renders the first option label when multiple options are selected', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
  ])

  render(<ComboboxSelectedContent listboxId="test-listbox" />)

  expect(screen.getByText('Option 1')).toBeVisible()
  expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
})

test('calls children render-prop when provided and options are selected', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])

  const children = vi.fn()
  render(<ComboboxSelectedContent listboxId="test-listbox">{children}</ComboboxSelectedContent>)

  expect(children).toHaveBeenCalledWith({ label: 'Option 1', value: 'option-1' })
})

test('does not call children render-prop when no options are selected', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  const children = vi.fn()
  render(<ComboboxSelectedContent listboxId="test-listbox">{children}</ComboboxSelectedContent>)

  expect(children).not.toHaveBeenCalled()
})

test('passes listboxId to useComboboxSelectedOptions hook', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  render(<ComboboxSelectedContent listboxId="custom-listbox-id" />)

  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('custom-listbox-id', [])
})

test('uses defaultOptions prop when provided', () => {
  const defaultOptions = [{ label: 'Default Option', value: 'default-value' }]

  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  render(<ComboboxSelectedContent listboxId="test-listbox" defaultOptions={defaultOptions} />)

  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('test-listbox', defaultOptions)
})

test('uses context default options when defaultOptions prop is not provided', () => {
  const contextDefaultOptions = [{ label: 'Context Default', value: 'context-value' }]

  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  render(
    <ComboboxDefaultOptionsContext.Provider value={contextDefaultOptions}>
      <ComboboxSelectedContent listboxId="test-listbox" />
    </ComboboxDefaultOptionsContext.Provider>,
  )

  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('test-listbox', contextDefaultOptions)
})

test('prefers defaultOptions prop over context default options', () => {
  const propDefaultOptions = [{ label: 'Prop Default', value: 'prop-value' }]
  const contextDefaultOptions = [{ label: 'Context Default', value: 'context-value' }]

  vi.mocked(useComboboxSelectedOptions).mockReturnValue([])

  render(
    <ComboboxDefaultOptionsContext.Provider value={contextDefaultOptions}>
      <ComboboxSelectedContent listboxId="test-listbox" defaultOptions={propDefaultOptions} />
    </ComboboxDefaultOptionsContext.Provider>,
  )

  expect(useComboboxSelectedOptions).toHaveBeenCalledWith('test-listbox', propDefaultOptions)
})

test('falls back to first option label when render prop returns null', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])

  render(<ComboboxSelectedContent listboxId="test-listbox">{() => null}</ComboboxSelectedContent>)

  expect(screen.getByText('Option 1')).toBeVisible()
})

test('falls back to first option label when render prop returns undefined', () => {
  vi.mocked(useComboboxSelectedOptions).mockReturnValue([{ label: 'Option 1', value: 'option-1' }])

  render(<ComboboxSelectedContent listboxId="test-listbox">{() => undefined}</ComboboxSelectedContent>)

  expect(screen.getByText('Option 1')).toBeVisible()
})

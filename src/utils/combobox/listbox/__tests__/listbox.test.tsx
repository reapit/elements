import { ComboboxContext } from '../../context'
import { ComboboxListbox } from '../listbox'
import { render, screen } from '@testing-library/react'

test('renders as a listbox', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toBeVisible()
})

test('has attributes specified by ComboboxContext', () => {
  render(
    <ComboboxContext.Provider value={{ ...defaultContext, disabled: true, required: true }}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-disabled', 'true')
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-required', 'true')
  expect(screen.getByRole('listbox')).toHaveAttribute('id', 'listbox-id')
})

test('has aria-orientation="vertical"', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'vertical')
})

test('options have data-select-action="auto" by default', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxListbox>
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
      </ComboboxListbox>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'auto')
})

test('can override the default select action', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxListbox selectAction="toggle">
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
      </ComboboxListbox>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'toggle')
})

const defaultContext: ComboboxContext.Value = {
  comboboxId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  multiple: false,
  popupId: 'popup-id',
  required: false,
  size: 'medium',
}

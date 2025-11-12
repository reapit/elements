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

test('options have data-select-action="select"', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxListbox>
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
      </ComboboxListbox>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'select')
})

const defaultContext: ComboboxContext.Value = {
  buttonId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  popupId: 'popup-id',
  required: false,
}

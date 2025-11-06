import { ComboboxContext } from '../../context'
import { ComboboxListbox } from '../listbox'
import { render, screen } from '@testing-library/react'

test('renders as a listbox', () => {
  render(
    <ComboboxContext.Provider value={{ listboxId: 'listbox-id' }}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toBeVisible()
})

test('has ID specified by ComboboxContext', () => {
  render(
    <ComboboxContext.Provider value={{ listboxId: 'listbox-id' }}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('id', 'listbox-id')
})

test('has aria-orientation="vertical"', () => {
  render(
    <ComboboxContext.Provider value={{ listboxId: 'listbox-id' }}>
      <ComboboxListbox />
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'vertical')
})

test('options have data-select-action="select"', () => {
  render(
    <ComboboxContext.Provider value={{ listboxId: 'listbox-id' }}>
      <ComboboxListbox>
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
      </ComboboxListbox>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'select')
})

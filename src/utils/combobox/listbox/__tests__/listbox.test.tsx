import { ComboboxContext } from '../../context'
import { ComboboxListbox } from '../listbox'
import { ComboboxPopupDialogContext } from '../../popup-dialog/context'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopupDialogContext.Provider value={defaultPopupContext}>{children}</ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>
  )
}

test('renders as a listbox', () => {
  render(<ComboboxListbox />, { wrapper: Wrapper })
  expect(screen.getByRole('listbox')).toBeVisible()
})

test('has attributes specified by ComboboxContext', () => {
  render(
    <ComboboxContext.Provider value={{ ...defaultContext, disabled: true, required: true }}>
      <ComboboxPopupDialogContext.Provider value={defaultPopupContext}>
        <ComboboxListbox />
      </ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-disabled', 'true')
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-required', 'true')
  expect(screen.getByRole('listbox')).toHaveAttribute('id', 'listbox-id')
})

test('has aria-orientation="vertical"', () => {
  render(<ComboboxListbox />, { wrapper: Wrapper })
  expect(screen.getByRole('listbox')).toHaveAttribute('aria-orientation', 'vertical')
})

test('options have data-select-action="auto" by default', () => {
  render(
    <ComboboxListbox>
      <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
    </ComboboxListbox>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'auto')
})

test('can override the default select action', () => {
  render(
    <ComboboxListbox selectAction="toggle">
      <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
    </ComboboxListbox>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('option')).toHaveAttribute('data-select-action', 'toggle')
})

test('sets tabIndex=0 when popup has no search input', () => {
  render(<ComboboxListbox />, { wrapper: Wrapper })
  expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '0')
})

test('sets tabIndex=-1 when popup has a search input', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopupDialogContext.Provider value={{ ...defaultPopupContext, hasSearch: true }}>
        <ComboboxListbox />
      </ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '-1')
})

const defaultContext: ComboboxContext.Value = {
  comboboxId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  multiple: false,
  popupId: 'popup-id',
  required: false,
  searchInputId: 'search-input-id',
  size: 'medium',
}

const defaultPopupContext: ComboboxPopupDialogContext.Value = {
  hasSearch: false,
  variant: 'auto',
}

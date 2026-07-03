import { ComboboxContext } from '../../context'
import { ComboboxPopupDialogContext } from '../../popup-dialog/context'
import { ComboboxSearchInput } from '../search-input'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useMatchMedia } from '#src/utils/match-media'
import type { ReactNode } from 'react'

vi.mock('#src/utils/match-media')

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ComboboxPopupDialogContext.Provider value={{ hasSearch: true, variant: 'auto' }}>
        {children}
      </ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>
  )
}

test('renders a textbox', () => {
  render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  expect(screen.getByRole('textbox')).toBeVisible()
})

test('applies "default" variant when popup variant is "popover"', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ComboboxPopupDialogContext.Provider value={{ hasSearch: true, variant: 'popover' }}>
        <ComboboxSearchInput aria-label="Filter options" />
      </ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

test('applies "borderless" variant when popup variant is "drawer"', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ComboboxPopupDialogContext.Provider value={{ hasSearch: true, variant: 'drawer' }}>
        <ComboboxSearchInput aria-label="Filter options" />
      </ComboboxPopupDialogContext.Provider>
    </ComboboxContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'borderless')
})

test('applies "borderless" variant when popup variant is "auto" and viewport is XS', () => {
  vi.mocked(useMatchMedia).mockReturnValue(true)
  const { container } = render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'borderless')
})

test('applies "default" variant when popup variant is "auto" and viewport is not XS', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

test('sets aria-autocomplete="list" on the input', () => {
  render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-autocomplete', 'list')
})

test('sets aria-controls to the listbox id', () => {
  render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-controls', 'listbox-id')
})

test('skips internal keyboard navigation when the composed onKeyDown calls preventDefault', () => {
  const listboxElement = document.createElement('div')
  listboxElement.id = 'listbox-id'
  const option = document.createElement('button')
  option.id = 'option-1'
  listboxElement.appendChild(option)
  document.body.appendChild(listboxElement)

  const onKeyDown: ComboboxSearchInput.Props['onKeyDown'] = (event) => event.preventDefault()
  render(<ComboboxSearchInput aria-label="Filter options" onKeyDown={onKeyDown} />, { wrapper: Wrapper })
  const input = screen.getByRole('textbox')

  fireEvent.keyDown(input, { key: 'ArrowDown' })

  expect(input).not.toHaveAttribute('aria-activedescendant')

  listboxElement.remove()
})

test('clears aria-activedescendant when the active option is removed from the DOM', async () => {
  const listboxElement = document.createElement('div')
  listboxElement.id = 'listbox-id'
  const option = document.createElement('button')
  option.id = 'option-1'
  listboxElement.appendChild(option)
  document.body.appendChild(listboxElement)

  const { rerender } = render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  const input = screen.getByRole('textbox')
  input.setAttribute('aria-activedescendant', 'option-1')

  option.remove()
  rerender(<ComboboxSearchInput aria-label="Filter options" />)

  await waitFor(() => expect(input).not.toHaveAttribute('aria-activedescendant'))

  listboxElement.remove()
})

test('clears aria-activedescendant and the active option when the input is blurred', () => {
  const listboxElement = document.createElement('div')
  listboxElement.id = 'listbox-id'
  const option = document.createElement('button')
  option.id = 'option-1'
  option.dataset.isActive = 'true'
  listboxElement.appendChild(option)
  document.body.appendChild(listboxElement)

  render(<ComboboxSearchInput aria-label="Filter options" />, { wrapper: Wrapper })
  const input = screen.getByRole('textbox')
  input.setAttribute('aria-activedescendant', 'option-1')

  fireEvent.blur(input)

  expect(input).not.toHaveAttribute('aria-activedescendant')
  expect(option).not.toHaveAttribute('data-is-active')

  listboxElement.remove()
})

const defaultComboboxContext: ComboboxContext.Value = {
  comboboxId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  multiple: false,
  popupId: 'popup-id',
  required: false,
  searchInputId: 'search-input-id',
  size: 'medium',
}

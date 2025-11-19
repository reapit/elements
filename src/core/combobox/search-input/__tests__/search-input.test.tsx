import { ComboboxPopupDialogContext } from '../../popup-dialog/context'
import { ComboboxSearchInput } from '../search-input'
import { render, screen } from '@testing-library/react'
import { useMatchMedia } from '#src/utils/match-media'

vi.mock('#src/utils/match-media')

test('renders a textbox', () => {
  render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'auto' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(screen.getByRole('textbox')).toBeVisible()
})

test('applies "default" variant when popup variant is "popover"', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'popover' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

test('applies "borderless" variant when popup variant is "drawer"', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'drawer' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'borderless')
})

test('applies "borderless" variant when popup variant is "auto" and viewport is XS', () => {
  vi.mocked(useMatchMedia).mockReturnValue(true)
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'auto' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'borderless')
})

test('applies "default" variant when popup variant is "auto" and viewport is not XS', () => {
  vi.mocked(useMatchMedia).mockReturnValue(false)
  const { container } = render(
    <ComboboxPopupDialogContext.Provider value={{ variant: 'auto' }}>
      <ComboboxSearchInput aria-label="Filter options" />
    </ComboboxPopupDialogContext.Provider>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-variant', 'default')
})

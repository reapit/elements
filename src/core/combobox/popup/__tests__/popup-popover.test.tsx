import { ComboboxPopupPopover } from '../popup-popover'
import { render, screen } from '@testing-library/react'

test('renders as a dialog element', () => {
  render(
    <ComboboxPopupPopover aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders its children', () => {
  render(
    <ComboboxPopupPopover aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByText('Content')).toBeVisible()
})

test('has popover="auto" attribute', () => {
  render(
    <ComboboxPopupPopover aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('popover', 'auto')
})

test('applies aria-labelledby attribute', () => {
  render(
    <ComboboxPopupPopover aria-labelledby="custom-label" id="popup-id">
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'custom-label')
})

test('applies id attribute', () => {
  render(
    <ComboboxPopupPopover aria-labelledby="label-id" id="custom-id">
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('id', 'custom-id')
})

test('forwards additional props to popover', () => {
  render(
    <ComboboxPopupPopover
      aria-labelledby="label-id"
      id="popup-id"
      data-testid="custom-popover"
      className="custom-class"
    >
      Content
    </ComboboxPopupPopover>,
  )
  expect(screen.getByTestId('custom-popover')).toBeVisible()
  expect(screen.getByTestId('custom-popover')).toHaveClass('custom-class')
})

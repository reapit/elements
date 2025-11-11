import { ComboboxPopupDrawer } from '../popup-drawer'
import { render, screen, waitFor } from '@testing-library/react'
import { showComboboxPopup } from '../show-popup'

test('renders as a dialog element', () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('popup-id')

  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders its children', async () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('popup-id')

  await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
})

test('has close button', async () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="label-id" id="popup-id">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('popup-id')

  await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toBeVisible())
})

test('applies aria-labelledby attribute', () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="custom-label" id="popup-id">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('popup-id')

  expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'custom-label')
})

test('applies id attribute', () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="label-id" id="custom-id">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('custom-id')

  expect(screen.getByRole('dialog')).toHaveAttribute('id', 'custom-id')
})

test('forwards additional props to drawer', () => {
  render(
    <ComboboxPopupDrawer aria-labelledby="label-id" id="popup-id" data-testid="custom-drawer" className="custom-class">
      Content
    </ComboboxPopupDrawer>,
  )
  showComboboxPopup('popup-id')

  expect(screen.getByTestId('custom-drawer')).toBeVisible()
  expect(screen.getByTestId('custom-drawer')).toHaveClass('custom-class')
})

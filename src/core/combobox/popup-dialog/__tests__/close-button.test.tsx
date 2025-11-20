import { render, screen } from '@testing-library/react'
import { ComboboxPopupDialogCloseButton } from '../close-button'

test('renders a button within a form', () => {
  render(<ComboboxPopupDialogCloseButton />)
  const button = screen.getByRole('button', { name: 'Close' })
  expect(button).toBeVisible()
  expect(button.parentElement?.tagName).toBe('FORM')
})

test('button is configured to close its parent dialog element', () => {
  render(<ComboboxPopupDialogCloseButton />)
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('formMethod', 'dialog')
  expect(button).toHaveAttribute('type', 'submit')
})

test('button has the expected icon', () => {
  render(<ComboboxPopupDialogCloseButton />)
  const button = screen.getByRole('button')
  expect(button.querySelector('svg')).toBeInTheDocument()
})

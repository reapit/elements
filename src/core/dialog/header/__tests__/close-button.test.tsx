import { render, screen } from '@testing-library/react'
import { DialogHeaderCloseButton } from '../close-button'

test('renders a button within a form', () => {
  render(<DialogHeaderCloseButton />)
  const button = screen.getByRole('button', { name: 'Close' })
  expect(button).toBeVisible()
  expect(button.parentElement?.tagName).toBe('FORM')
})

test('button is configured to be auto-focused', () => {
  render(<DialogHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button).toHaveFocus()
})

test('button is configured to close its parent dialog element', () => {
  render(<DialogHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('formMethod', 'dialog')
  expect(button).toHaveAttribute('type', 'submit')
})

test('button has the expected icon', () => {
  render(<DialogHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button.querySelector('svg')).toBeInTheDocument()
})

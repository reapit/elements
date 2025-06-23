import { render, screen } from '@testing-library/react'
import { DrawerHeaderCloseButton } from '../close-button'

test('renders a button within a form', () => {
  render(<DrawerHeaderCloseButton />)
  const button = screen.getByRole('button', { name: 'Close' })
  expect(button).toBeVisible()
  expect(button.parentElement?.tagName).toBe('FORM')
})

test('button is configured to be auto-focused', () => {
  render(<DrawerHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button).toHaveFocus()
})

test('button is configured to close its parent dialog element', () => {
  render(<DrawerHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('formMethod', 'dialog')
  expect(button).toHaveAttribute('type', 'submit')
})

test('button has the expected icon', () => {
  render(<DrawerHeaderCloseButton />)
  const button = screen.getByRole('button')
  expect(button.querySelector('svg')).toBeInTheDocument()
})

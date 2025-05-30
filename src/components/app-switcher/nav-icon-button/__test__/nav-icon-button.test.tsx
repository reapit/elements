import { render, screen } from '@testing-library/react'
import NavIconButton from '../nav-icon-button'

test('renders a button element', () => {
  render(<NavIconButton onClick={() => void 0} />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('has a default accessible name of "app switcher"', () => {
  render(<NavIconButton onClick={() => void 0} />)
  expect(screen.getByRole('button', { name: 'app switcher' })).toBeVisible()
})

test('allows the accessible name to be supplied by the consumer', () => {
  render(<NavIconButton aria-label="my button" onClick={() => void 0} />)
  expect(screen.getByRole('button', { name: 'my button' })).toBeVisible()
})

test('allows the accessible name to be supplied by the consumer', () => {
  render(<NavIconButton aria-expanded="true" onClick={() => void 0} />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'true')
})

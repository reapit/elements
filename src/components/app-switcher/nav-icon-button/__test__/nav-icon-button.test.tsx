import { render, screen } from '@testing-library/react'
import { AppSwitcherNavIconButton } from '../nav-icon-button'

test('renders a button element', () => {
  render(<AppSwitcherNavIconButton onClick={() => void 0} />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('has a default accessible name of "App Switcher"', () => {
  render(<AppSwitcherNavIconButton onClick={() => void 0} />)
  expect(screen.getByRole('button', { name: 'App Switcher' })).toBeVisible()
})

test('allows the accessible name to be supplied by the consumer', () => {
  render(<AppSwitcherNavIconButton aria-label="my button" onClick={() => void 0} />)
  expect(screen.getByRole('button', { name: 'my button' })).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<AppSwitcherNavIconButton aria-expanded="true" onClick={() => void 0} />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
})

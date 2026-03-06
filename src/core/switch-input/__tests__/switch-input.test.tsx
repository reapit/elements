import { SwitchInput } from '../switch-input'
import { render, screen } from '@testing-library/react'

test('renders a switch element', () => {
  render(<SwitchInput />)
  expect(screen.getByRole('switch')).toBeVisible()
})

test('is always a as type="checkbox" input', () => {
  render(<SwitchInput />)
  expect(screen.getByRole('switch')).toHaveAttribute('type', 'checkbox')
})

test('can be checked', () => {
  render(<SwitchInput checked onChange={() => void 0} />)
  expect(screen.getByRole('switch')).toBeChecked()
})

test('can be disabled', () => {
  render(<SwitchInput disabled />)
  expect(screen.getByRole('switch')).toBeDisabled()
})

test('forwards additional attributes to the switch', () => {
  render(<SwitchInput data-testid="my-switch" />)
  expect(screen.getByRole('switch')).toHaveAttribute('data-testid', 'my-switch')
})

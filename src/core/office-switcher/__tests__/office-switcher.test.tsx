import { OfficeSwitcher } from '../office-switcher'
import { render, screen } from '@testing-library/react'

test('renders children', () => {
  render(<OfficeSwitcher>London Office</OfficeSwitcher>)
  expect(screen.getByText('London Office')).toBeVisible()
})

test('forwards additional props to underlying element', () => {
  render(<OfficeSwitcher data-testid="my-office-switcher">London Office</OfficeSwitcher>)
  expect(screen.getByTestId('my-office-switcher')).toBeVisible()
})

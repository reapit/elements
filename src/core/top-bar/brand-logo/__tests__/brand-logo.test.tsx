import { render, screen } from '@testing-library/react'
import { BrandLogo } from '..'

test('renders a link with correct accessible name', () => {
  render(<BrandLogo appName="Reapit PM" />)
  const link = screen.getByRole('link', { name: 'Go to Reapit PM' })
  expect(link).toBeVisible()
})

test('the link has the correct SVG descendant', () => {
  render(<BrandLogo appName="Reapit" />)
  const link = screen.getByRole('link')
  const svg = link.querySelector('svg')
  expect(svg).toBeVisible()
  expect(svg).toHaveAccessibleName('Reapit')
})

test('the link has a default href of "/"', () => {
  render(<BrandLogo appName="Reapit" />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/')
})

test('a custom href can be provided', () => {
  render(<BrandLogo appName="Reapit" href="/dashboard" />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/dashboard')
})

test('forwards additional props to the link', () => {
  render(<BrandLogo appName="Reapit Forms" data-testid="logo" />)
  const link = screen.getByTestId('logo')
  expect(link).toBeVisible()
})

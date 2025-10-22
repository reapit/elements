import { render, screen } from '@testing-library/react'
import { Switch } from '../switch'

test('renders a switch element', () => {
  render(<Switch />)
  expect(screen.getByRole('switch')).toBeVisible()
})

test('the switch is labelled by the label text', () => {
  render(<Switch label="My switch" />)
  expect(screen.getByRole('switch', { name: 'My switch' })).toBeVisible()
})

test('places the label at the end by default', () => {
  render(<Switch label="Test Label" />)
  const label = screen.getByText('Test Label')
  expect(label).toBeVisible()
})

test('can place the label at the start', () => {
  render(<Switch label="Test Label" labelPlacement="start" />)
  const label = screen.getByText('Test Label')
  expect(label).toBeVisible()
})

test('applies custom className to the label element', () => {
  const { container } = render(<Switch className="custom-class" />)
  const label = container.querySelector('label')
  expect(label).toHaveClass('custom-class')
})

test('applies custom inline styles to the label element', () => {
  const { container } = render(<Switch style={{ color: 'red' }} />)
  const label = container.querySelector('label')
  expect(label).toHaveStyle({ color: 'red' })
})

test('forwards additional attributes to the switch', () => {
  const { container } = render(<Switch checked disabled name="test-switch" />)
  const input = container.querySelector('input[type="checkbox"]')
  expect(input).toBeChecked()
  expect(input).toBeDisabled()
  expect(input).toHaveAttribute('name', 'test-switch')
})

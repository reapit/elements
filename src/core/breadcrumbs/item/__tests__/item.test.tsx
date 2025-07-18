import { render, screen } from '@testing-library/react'
import { BreadcrumbItem } from '../item'

test('renders a list item', () => {
  render(<BreadcrumbItem>Item</BreadcrumbItem>)
  expect(screen.getByRole('listitem')).toBeVisible()
})

test('renders with a chevron by default', () => {
  const { container } = render(<BreadcrumbItem>Item</BreadcrumbItem>)

  const chevronIcon = container.querySelector('svg')
  expect(chevronIcon).toBeInTheDocument()
})

test('forwards additional props to the list item element', () => {
  render(<BreadcrumbItem data-testid="test-item">Item</BreadcrumbItem>)
  expect(screen.getByTestId('test-item')).toBeVisible()
})

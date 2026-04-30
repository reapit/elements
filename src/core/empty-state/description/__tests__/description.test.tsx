import { EmptyStateDescription } from '../description'
import { render, screen } from '@testing-library/react'

test('displays the main text in a heading level 3 element', () => {
  render(<EmptyStateDescription>No things found</EmptyStateDescription>)
  expect(screen.getByRole('heading', { name: 'No things found', level: 3 })).toBeVisible()
})

test('displays the secondary text in a paragraph element', () => {
  render(<EmptyStateDescription secondaryText="Secondary text">No things found</EmptyStateDescription>)
  expect(screen.getByRole('paragraph')).toBeVisible()
  expect(screen.getByRole('paragraph')).toHaveTextContent('Secondary text')
})

test('forwards additional props to the root element', () => {
  const { container } = render(<EmptyStateDescription data-testid="test-id">No things found</EmptyStateDescription>)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

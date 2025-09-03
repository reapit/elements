import { render, screen } from '@testing-library/react'
import { TableToolbar } from '../toolbar'

test('renders a generic element', () => {
  const { container } = render(<TableToolbar />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(container.firstElementChild).toBeVisible()
})

test('displays left content when provided', () => {
  render(<TableToolbar leftContent="Left content" />)
  expect(screen.getByText('Left content')).toBeVisible()
})

test('displays right content when provided', () => {
  render(<TableToolbar rightContent="Right content" />)
  expect(screen.getByText('Right content')).toBeVisible()
})

test('forwards additional props to the root element', () => {
  const { container } = render(<TableToolbar data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

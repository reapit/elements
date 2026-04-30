import { EmptyStateActionButton } from '../action-button'
import { render, screen } from '@testing-library/react'

test('renders as a button element', () => {
  render(<EmptyStateActionButton>Action</EmptyStateActionButton>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test('is a medium sized button', () => {
  render(<EmptyStateActionButton>Action</EmptyStateActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'medium')
})

test('is a tertiary button', () => {
  render(<EmptyStateActionButton>Action</EmptyStateActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test("uses the tertiary button's link styling", () => {
  render(<EmptyStateActionButton>Action</EmptyStateActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-use-link-style', 'true')
})

test('forwards additional props to the link', () => {
  render(<EmptyStateActionButton data-testid="test-id">Action</EmptyStateActionButton>)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

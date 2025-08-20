import { EmptyDataActionButton } from '../action-button'
import { render, screen } from '@testing-library/react'

test('renders as a button element', () => {
  render(<EmptyDataActionButton>Action</EmptyDataActionButton>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test('is a medium sized button', () => {
  render(<EmptyDataActionButton>Action</EmptyDataActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'medium')
})

test('is a tertiary button', () => {
  render(<EmptyDataActionButton>Action</EmptyDataActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test("uses the tertiary button's link styling", () => {
  render(<EmptyDataActionButton>Action</EmptyDataActionButton>)
  expect(screen.getByRole('button')).toHaveAttribute('data-use-link-style', 'true')
})

test('forwards additional props to the link', () => {
  render(<EmptyDataActionButton data-testid="test-id">Action</EmptyDataActionButton>)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

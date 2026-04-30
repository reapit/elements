import { EmptyState } from '../empty-state'
import { render, screen } from '@testing-library/react'

test('renders as a div', () => {
  const { container } = render(<EmptyState>Fake child</EmptyState>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('displays children', () => {
  render(<EmptyState>Fake child</EmptyState>)
  expect(screen.getByText('Fake child')).toBeVisible()
})

test('sets height via style prop when provided', () => {
  render(<EmptyState height="--size-80">Fake child</EmptyState>)
  expect(screen.getByText('Fake child')).toHaveAttribute('style', 'height: var(--size-80);')
})

test('preserves other inline styles when height is provided', () => {
  render(
    <EmptyState height="--size-40" style={{ color: 'red' }}>
      Fake child
    </EmptyState>,
  )
  expect(screen.getByText('Fake child')).toHaveAttribute('style', 'color: red; height: var(--size-40);')
})

test('forwards additional props to div', () => {
  const { container } = render(<EmptyState data-testid="test-id">Fake child</EmptyState>)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

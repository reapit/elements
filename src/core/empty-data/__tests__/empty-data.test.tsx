import { EmptyData } from '../empty-data'
import { render, screen } from '@testing-library/react'

test('renders as a div', () => {
  const { container } = render(<EmptyData>Fake child</EmptyData>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('displays children', () => {
  render(<EmptyData>Fake child</EmptyData>)
  expect(screen.getByText('Fake child')).toBeVisible()
})

test('sets height via style prop when provided', () => {
  render(<EmptyData height="--size-80">Fake child</EmptyData>)
  expect(screen.getByText('Fake child')).toHaveAttribute('style', 'height: var(--size-80);')
})

test('preserves other inline styles when height is provided', () => {
  render(
    <EmptyData height="--size-40" style={{ color: 'red' }}>
      Fake child
    </EmptyData>,
  )
  expect(screen.getByText('Fake child')).toHaveAttribute('style', 'color: red; height: var(--size-40);')
})

test('forwards additional props to div', () => {
  const { container } = render(<EmptyData data-testid="test-id">Fake child</EmptyData>)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

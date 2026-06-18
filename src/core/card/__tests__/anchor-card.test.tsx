import { render, screen } from '@testing-library/react'
import { AnchorCard } from '../anchor-card'

test('renders a link element', () => {
  render(<AnchorCard href="https://example.com">Content</AnchorCard>)
  expect(screen.getByRole('link')).toBeVisible()
})

test('renders children', () => {
  render(<AnchorCard href="https://example.com">Hello card</AnchorCard>)
  expect(screen.getByText('Hello card')).toBeVisible()
})

test('forwards href to the anchor element', () => {
  render(<AnchorCard href="https://example.com">Content</AnchorCard>)
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
})

test('forwards aria-current to the anchor element', () => {
  render(
    <AnchorCard aria-current="page" href="https://example.com">
      Content
    </AnchorCard>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('does not set aria-current when not provided', () => {
  render(<AnchorCard href="https://example.com">Content</AnchorCard>)
  expect(screen.getByRole('link')).not.toHaveAttribute('aria-current')
})

test('forwards target and rel to the anchor element', () => {
  render(
    <AnchorCard href="https://example.com" rel="noreferrer" target="_blank">
      Content
    </AnchorCard>,
  )
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noreferrer')
})

test('applies borderRadius override as an inline style', () => {
  render(
    <AnchorCard borderRadius="--border-radius-l" data-testid="card" href="https://example.com">
      Content
    </AnchorCard>,
  )
  expect(screen.getByTestId('card').style.borderRadius).toBe('var(--border-radius-l)')
})

test('applies padding override as a CSS variable', () => {
  render(
    <AnchorCard data-testid="card" href="https://example.com" padding="--spacing-2">
      Content
    </AnchorCard>,
  )
  expect(screen.getByTestId('card').style.getPropertyValue('--card-padding')).toBe('var(--spacing-2)')
})

test('forwards additional props to the underlying element', () => {
  render(
    <AnchorCard data-testid="my-card" href="https://example.com">
      Content
    </AnchorCard>,
  )
  expect(screen.getByTestId('my-card')).toBeVisible()
})

test('forwards className to the underlying element', () => {
  render(
    <AnchorCard className="custom" data-testid="card" href="https://example.com">
      Content
    </AnchorCard>,
  )
  expect(screen.getByTestId('card')).toHaveClass('custom')
})

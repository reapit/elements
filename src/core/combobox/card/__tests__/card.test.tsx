import { ComboboxCard } from '../card'
import { render, screen } from '@testing-library/react'

test('renders an article element', () => {
  const { container } = render(<ComboboxCard aria-controls="listbox">Content</ComboboxCard>)
  expect(container.firstElementChild?.tagName).toBe('ARTICLE')
})

test('displays children content', () => {
  render(<ComboboxCard aria-controls="listbox">Test content</ComboboxCard>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('applies aria-controls to clear button', () => {
  render(<ComboboxCard aria-controls="my-listbox">Content</ComboboxCard>)
  const clearButton = screen.getByRole('button')
  expect(clearButton).toHaveAttribute('aria-controls', 'my-listbox')
})

test('passes disabled state to clear button', () => {
  render(
    <ComboboxCard aria-controls="listbox" disabled>
      Content
    </ComboboxCard>,
  )
  expect(screen.getByRole('button')).toBeDisabled()
})

test('does not disable clear button when disabled prop is false', () => {
  render(
    <ComboboxCard aria-controls="listbox" disabled={false}>
      Content
    </ComboboxCard>,
  )
  expect(screen.getByRole('button')).not.toBeDisabled()
})

test('does not disable clear button when disabled prop is omitted', () => {
  render(<ComboboxCard aria-controls="listbox">Content</ComboboxCard>)
  expect(screen.getByRole('button')).not.toBeDisabled()
})

test('renders clear button', () => {
  render(<ComboboxCard aria-controls="listbox">Content</ComboboxCard>)
  expect(screen.getByRole('button')).toBeVisible()
})

test('forwards additional props to the article element', () => {
  render(
    <ComboboxCard aria-controls="listbox" data-testid="my-card">
      Content
    </ComboboxCard>,
  )
  expect(screen.getByTestId('my-card')).toBeVisible()
})

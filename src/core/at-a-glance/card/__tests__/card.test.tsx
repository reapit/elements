import { AtAGlanceCard } from '../card'
import { render, screen } from '@testing-library/react'

test('renders an article element', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" />)
  expect(screen.getByRole('article')).toBeVisible()
})

test('displays label as heading', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" />)
  expect(screen.getByRole('heading', { level: 1, name: 'Test Label' })).toBeVisible()
})

test('displays value', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="$12,345" />)
  expect(screen.getByText('$12,345')).toBeVisible()
})

test('displays description when provided', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" description="Test Description" />)
  expect(screen.getByText('Test Description')).toBeVisible()
})

test('does not display description when not provided', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" />)
  expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
})

test('displays icon when provided', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" icon={<svg data-testid="test-icon" />} />)
  expect(screen.getByTestId('test-icon')).toBeVisible()
})

test('does not display icon when not provided', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" />)
  expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
})

test('applies vertical layout by default', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" />)
  expect(screen.getByRole('article')).toHaveAttribute('data-layout', 'vertical')
})

test('applies horizontal layout when specified', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" layout="horizontal" />)
  expect(screen.getByRole('article')).toHaveAttribute('data-layout', 'horizontal')
})

test('applies compact layout when specified', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" layout="compact" />)
  expect(screen.getByRole('article')).toHaveAttribute('data-layout', 'compact')
})

test('applies max-width when specified', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" maxWidth="300px" />)
  expect(screen.getByRole('article')).toHaveStyle({ maxWidth: '300px' })
})

test('applies min-width when specified', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" minWidth="200px" />)
  expect(screen.getByRole('article')).toHaveStyle({ minWidth: '200px' })
})

test('applies custom styles', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" style={{ color: 'red' }} />)
  expect(screen.getByRole('article')).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the article', () => {
  render(<AtAGlanceCard label="Test Label" displayValue="Test Value" data-testid="custom-card" />)
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('article'))
})

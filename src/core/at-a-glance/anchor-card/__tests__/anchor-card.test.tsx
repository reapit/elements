import { AtAGlanceAnchorCard } from '../anchor-card'
import { render, screen } from '@testing-library/react'

test('renders a link element', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" />)
  expect(screen.getByRole('link', { name: 'Test Label' })).toBeVisible()
})

test('displays label', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" />)
  expect(screen.getByText('Test Label')).toBeVisible()
})

test('displays value', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="$12,345" />)
  expect(screen.getByText('$12,345')).toBeVisible()
  expect(screen.getByRole('link')).toHaveAccessibleDescription('$12,345')
})

test('displays description when provided', () => {
  render(
    <AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" description="Test Description" />,
  )
  expect(screen.getByText('Test Description')).toBeVisible()
  expect(screen.getByRole('link')).toHaveAccessibleDescription('Test Description Test Value')
})

test('does not display description when not provided', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" />)
  expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
})

test('displays icon when provided', () => {
  render(
    <AtAGlanceAnchorCard
      href="/test"
      label="Test Label"
      displayValue="Test Value"
      icon={<svg data-testid="test-icon" />}
    />,
  )
  expect(screen.getByTestId('test-icon')).toBeVisible()
})

test('does not display icon when not provided', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" />)
  expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
})

test('applies vertical layout by default', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" />)
  expect(screen.getByRole('link')).toHaveAttribute('data-layout', 'vertical')
})

test('applies correct layout when specified', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" layout="horizontal" />)
  expect(screen.getByRole('link')).toHaveAttribute('data-layout', 'horizontal')
})

test('applies max-width when specified', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" maxWidth="300px" />)
  expect(screen.getByRole('link')).toHaveStyle({ maxWidth: '300px' })
})

test('applies min-width when specified', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" minWidth="200px" />)
  expect(screen.getByRole('link')).toHaveStyle({ minWidth: '200px' })
})

test('applies custom styles', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" style={{ color: 'red' }} />)
  expect(screen.getByRole('link')).toHaveStyle({ color: 'red' })
})

test('supports aria-current attribute', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" aria-current="page" />)
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('forwards additional props to the link', () => {
  render(<AtAGlanceAnchorCard href="/test" label="Test Label" displayValue="Test Value" data-testid="custom-link" />)
  expect(screen.getByTestId('custom-link')).toBe(screen.getByRole('link'))
})

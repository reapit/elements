import { AtAGlanceCard } from '../card'
import { render, screen } from '@testing-library/react'

test('renders an article element', () => {
  render(<AtAGlanceCard>Content</AtAGlanceCard>)
  expect(screen.getByRole('article')).toBeVisible()
})

test('displays children', () => {
  render(<AtAGlanceCard>Content</AtAGlanceCard>)
  expect(screen.getByText('Content')).toBeVisible()
})

test('applies max-width when specified', () => {
  render(<AtAGlanceCard maxWidth="100px">Content</AtAGlanceCard>)
  expect(screen.getByRole('article')).toHaveStyle({ maxWidth: '100px' })
})

test('applies min-width when specified', () => {
  render(<AtAGlanceCard minWidth="100px">Content</AtAGlanceCard>)
  expect(screen.getByRole('article')).toHaveStyle({ minWidth: '100px' })
})

test('applies custom styles', () => {
  render(<AtAGlanceCard style={{ color: 'red' }}>Content</AtAGlanceCard>)
  expect(screen.getByRole('article')).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the article', () => {
  render(<AtAGlanceCard data-testid="custom-card">Content</AtAGlanceCard>)
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('article'))
})

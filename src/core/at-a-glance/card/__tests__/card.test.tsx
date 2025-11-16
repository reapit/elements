import { AtAGlanceCard } from '../card'
import { render, screen } from '@testing-library/react'

test('renders an article element', () => {
  render(<AtAGlanceCard>Hello</AtAGlanceCard>)
  expect(screen.getByRole('article')).toBeVisible()
})

test('displays children', () => {
  render(<AtAGlanceCard>Child</AtAGlanceCard>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('applies max-width when specified', () => {
  render(
    <AtAGlanceCard maxWidth="100px">
      <div>Content</div>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ maxWidth: '100px' })
})

test('applies custom styles', () => {
  render(
    <AtAGlanceCard style={{ color: 'red' }}>
      <div>Content</div>
    </AtAGlanceCard>,
  )
  expect(screen.getByRole('article')).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the article', () => {
  render(
    <AtAGlanceCard data-testid="custom-card">
      <div>Content</div>
    </AtAGlanceCard>,
  )
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('article'))
})

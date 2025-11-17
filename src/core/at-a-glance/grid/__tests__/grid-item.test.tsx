import { AtAGlanceGridItem } from '../grid-item'
import { render, screen } from '@testing-library/react'

test('renders a list item element with a child article', () => {
  render(<AtAGlanceGridItem>Content</AtAGlanceGridItem>)
  expect(screen.getByRole('listitem')).toBeVisible()
  expect(screen.getByRole('article')).toBeVisible()
})

test('forwards additional props to the article', () => {
  render(<AtAGlanceGridItem data-testid="custom-card">Content</AtAGlanceGridItem>)
  expect(screen.getByTestId('custom-card')).toBe(screen.getByRole('article'))
})

import { render, screen } from '@testing-library/react'
import { TagGroupItem } from '../tag-group-item'

test('renders as a list item element', () => {
  render(<TagGroupItem>Tag</TagGroupItem>)

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()
  expect(listItem).toHaveTextContent('Tag')
})

test('forwards other props to the underlying tag', () => {
  render(<TagGroupItem data-testid="custom-tag">Tag</TagGroupItem>)
  expect(screen.getByTestId('custom-tag')).toBeVisible()
  expect(screen.getByTestId('custom-tag')).toBe(screen.getByText('Tag'))
})

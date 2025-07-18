import { render, screen } from '@testing-library/react'
import { Tag } from '../tag'

test('tag is visible in the document', () => {
  render(<Tag>Tag</Tag>)
  expect(screen.getByText('Tag')).toBeVisible()
})

test('forwards other props to the underlying DOM element', () => {
  render(<Tag data-testid="custom-tag">Tag</Tag>)
  expect(screen.getByTestId('custom-tag')).toBeVisible()
  expect(screen.getByTestId('custom-tag')).toBe(screen.getByText('Tag'))
})

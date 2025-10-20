import { render, screen } from '@testing-library/react'
import { Tag } from '../tag'

test('tag is visible in the document', () => {
  render(<Tag>Tag</Tag>)
  expect(screen.getByText('Tag')).toBeVisible()
})

test('allows inline styles to be specified', () => {
  render(<Tag style={{ backgroundColor: 'red' }}>Tag</Tag>)
  // NOTE: the text is in a child element of the root element receiving the inline styles
  expect(screen.getByText('Tag').parentElement).toHaveStyle({ backgroundColor: 'red' })
})

test('forwards other props to the root element of the tag', () => {
  const { container } = render(<Tag data-testid="custom-tag">Tag</Tag>)
  expect(screen.getByTestId('custom-tag')).toBeVisible()
  expect(screen.getByTestId('custom-tag')).toBe(container.firstElementChild)
})

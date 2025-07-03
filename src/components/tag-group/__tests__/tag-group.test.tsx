import { render, screen } from '@testing-library/react'
import { TagGroup } from '../tag-group'

test('renders as a list element', () => {
  render(<TagGroup>Test Tag</TagGroup>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('passes through all props to the underlying list element', () => {
  render(<TagGroup data-testid="test-id">Test Tag</TagGroup>)
  expect(screen.getByTestId('test-id')).toBeVisible()
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('list'))
})

import { render, screen } from '@testing-library/react'
import { DialogFooter } from '../footer'

test('renders a footer element with the expected content', () => {
  render(<DialogFooter>Test content</DialogFooter>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional props to the footer element', () => {
  render(<DialogFooter data-testid="test-id">Test content</DialogFooter>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

import { render, screen } from '@testing-library/react'
import { DrawerFooter } from '../footer'

test('renders a footer element with the expected content', () => {
  render(<DrawerFooter>Test content</DrawerFooter>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional props to the footer element', () => {
  render(<DrawerFooter data-testid="test-id">Test content</DrawerFooter>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

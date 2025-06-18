import { render, screen } from '@testing-library/react'
import { DrawerBody } from '../body'

test('renders a div element with the expected content', () => {
  render(<DrawerBody>Test content</DrawerBody>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional props to the div element', () => {
  render(<DrawerBody data-testid="test-id">Test content</DrawerBody>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

import { render, screen } from '@testing-library/react'
import { DialogBody } from '../body'

test('renders a div element with the expected content', () => {
  render(<DialogBody>Test content</DialogBody>)
  expect(screen.getByText('Test content')).toBeVisible()
})

test('forwards additional props to the div element', () => {
  render(<DialogBody data-testid="test-id">Test content</DialogBody>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

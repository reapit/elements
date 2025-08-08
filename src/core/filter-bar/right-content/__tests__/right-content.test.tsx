import { FilterBarRightContent } from '../right-content'
import { render, screen } from '@testing-library/react'

test('renders children when provided', () => {
  render(<FilterBarRightContent>Child</FilterBarRightContent>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('forwards additional props to the root element', () => {
  render(<FilterBarRightContent data-testid="test-id">Child</FilterBarRightContent>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

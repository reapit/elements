import { FilterBarLeftContent } from '../left-content'
import { render, screen } from '@testing-library/react'

test('renders children when provided', () => {
  render(<FilterBarLeftContent>Child</FilterBarLeftContent>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('forwards additional props to the root element', () => {
  render(<FilterBarLeftContent data-testid="test-id">Child</FilterBarLeftContent>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

import { FilterBarAppliedFilters } from '../applied-filters'
import { render, screen } from '@testing-library/react'

test('renders children when provided', () => {
  render(<FilterBarAppliedFilters>Chip</FilterBarAppliedFilters>)
  expect(screen.getByText('Chip')).toBeVisible()
})

test('renders action element when provided', () => {
  render(<FilterBarAppliedFilters action="Action">Chip</FilterBarAppliedFilters>)
  expect(screen.getByText('Action')).toBeVisible()
  expect(screen.getByText('Chip')).toBeVisible()
})

test('forwards additional props to the root element', () => {
  render(<FilterBarAppliedFilters data-testid="test-id">Chip</FilterBarAppliedFilters>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})

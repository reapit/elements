import { FilterBar } from '../filter-bar'
import { render, screen } from '@testing-library/react'

test('renders a search element', () => {
  render(<FilterBar />)
  expect(screen.getByRole('search')).toBeVisible()
})

test('renders left content when provided', () => {
  render(<FilterBar leftContent="Left content" />)
  expect(screen.getByText('Left content')).toBeVisible()
})

test('renders right content when provided', () => {
  render(<FilterBar rightContent="Right content" />)
  expect(screen.getByText('Right content')).toBeVisible()
})

test('renders applied filters when provided', () => {
  render(<FilterBar appliedFilters="Applied filters" />)
  expect(screen.getByText('Applied filters')).toBeVisible()
})

test('forwards additional props to the search element', () => {
  render(<FilterBar data-testid="filter-bar" />)
  expect(screen.getByTestId('filter-bar')).toEqual(screen.getByRole('search'))
})

import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as tableBodyRowStories from '../body-row.stories'

const TableBodyRowStories = composeStories(tableBodyRowStories)

test('renders as a cell element by default', () => {
  render(<TableBodyRowStories.Example />)
  expect(screen.getByRole('row')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableBodyRowStories.Divs />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('row')).not.toBeInTheDocument()
})

test('has .el-table-body-row class', () => {
  render(<TableBodyRowStories.Example />)
  expect(screen.getByRole('row')).toHaveClass('el-table-body-row')
})

test('accepts other classes', () => {
  render(<TableBodyRowStories.Example className="custom-class" />)
  expect(screen.getByRole('row')).toHaveClass('el-table-body-row custom-class')
})

test('forwards additional props to the row', () => {
  render(<TableBodyRowStories.Example data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('row'))
})

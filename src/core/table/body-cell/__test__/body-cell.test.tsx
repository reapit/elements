import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as tableBodyCellStories from '../body-cell.stories'

const TableBodyCellStories = composeStories(tableBodyCellStories)

test('renders as a cell element by default', () => {
  render(<TableBodyCellStories.Example />)
  expect(screen.getByRole('cell')).toBeVisible()
})

test('can render as a row header cell', () => {
  render(<TableBodyCellStories.RowHeader scope="row" data-testid="table-cell" />)
  expect(screen.getByRole('rowheader')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableBodyCellStories.Divs />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('cell')).not.toBeInTheDocument()
})

test('applies `data-justify-content` when `justifyContent` is provided', () => {
  render(<TableBodyCellStories.Alignment />)
  expect(screen.getByRole('cell')).toHaveAttribute('data-justify-content', 'end')
})

test('has .el-table-body-cell class', () => {
  render(<TableBodyCellStories.Example />)
  expect(screen.getByRole('cell')).toHaveClass('el-table-body-cell')
})

test('accepts other classes', () => {
  render(<TableBodyCellStories.Example className="custom-class" />)
  expect(screen.getByRole('cell')).toHaveClass('el-table-body-cell custom-class')
})

test('forwards additional props to the cell', () => {
  render(<TableBodyCellStories.Example data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('cell'))
})

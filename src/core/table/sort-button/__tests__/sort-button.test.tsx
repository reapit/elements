import { render, screen } from '@testing-library/react'
import { TableCellSortButton } from '../sort-button'

test('renders as a button element', () => {
  render(
    <TableCellSortButton name="address" value="none">
      Property
    </TableCellSortButton>,
  )
  expect(screen.getByRole('button', { name: 'Property' })).toBeVisible()
})

test('renders an ARIA hidden icon', () => {
  const { container } = render(
    <TableCellSortButton name="address" value="none">
      Property
    </TableCellSortButton>,
  )
  expect(container.querySelector('svg')).toBeInTheDocument()
})

test('has .el-table-cell-sort-button class', () => {
  render(
    <TableCellSortButton name="address" value="none">
      Property
    </TableCellSortButton>,
  )
  expect(screen.getByRole('button')).toHaveClass('el-table-cell-sort-button')
})

test('accepts other classes', () => {
  render(
    <TableCellSortButton className="custom-class" name="address" value="none">
      Property
    </TableCellSortButton>,
  )
  expect(screen.getByRole('button')).toHaveClass('el-table-cell-sort-button custom-class')
})

test('forwards additional props to the button', () => {
  render(
    <TableCellSortButton data-testid="test-id" name="address" value="none">
      Property
    </TableCellSortButton>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

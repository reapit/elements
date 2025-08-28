import { buildTableWrapper } from '../../__story__/table-wrapper'
import { render, screen } from '@testing-library/react'
import { TableHeaderRow } from '../header-row'

const wrapper = buildTableWrapper('header-row')

test('renders as a cell element by default', () => {
  render(
    <TableHeaderRow>
      <td />
    </TableHeaderRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableHeaderRow as="div">Foo</TableHeaderRow>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('row')).not.toBeInTheDocument()
})

test('has .el-table-header-row class', () => {
  render(
    <TableHeaderRow>
      <td />
    </TableHeaderRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toHaveClass('el-table-header-row')
})

test('accepts other classes', () => {
  render(
    <TableHeaderRow className="custom-class">
      <td />
    </TableHeaderRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toHaveClass('el-table-header-row custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <TableHeaderRow data-testid="test-id">
      <td />
    </TableHeaderRow>,
    { wrapper },
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('row'))
})

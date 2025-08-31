import { buildTableWrapper } from '../../__story__/table-wrapper'
import { render, screen } from '@testing-library/react'
import { TableBodyRow } from '../body-row'

const wrapper = buildTableWrapper('body-row')

test('renders as a cell element by default', () => {
  render(
    <TableBodyRow>
      <td />
    </TableBodyRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableBodyRow as="div">Foo</TableBodyRow>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('row')).not.toBeInTheDocument()
})

test('has .el-table-body-row class', () => {
  render(
    <TableBodyRow>
      <td />
    </TableBodyRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toHaveClass('el-table-body-row')
})

test('accepts other classes', () => {
  render(
    <TableBodyRow className="custom-class">
      <td />
    </TableBodyRow>,
    { wrapper },
  )
  expect(screen.getByRole('row')).toHaveClass('el-table-body-row custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <TableBodyRow data-testid="test-id">
      <td />
    </TableBodyRow>,
    { wrapper },
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('row'))
})

import { buildTableWrapper } from '../../__story__/table-wrapper'
import { render, screen } from '@testing-library/react'
import { TableHead } from '../head'

const wrapper = buildTableWrapper('head')

test('renders as a rowgroup element by default', () => {
  render(
    <TableHead>
      <tr />
    </TableHead>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableHead as="div">Foo</TableHead>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('rowgroup')).not.toBeInTheDocument()
})

test('has .el-table-head class', () => {
  render(
    <TableHead>
      <tr />
    </TableHead>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-head')
})

test('accepts other classes', () => {
  render(
    <TableHead className="custom-class">
      <tr />
    </TableHead>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-head custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <TableHead data-testid="test-id">
      <tr />
    </TableHead>,
    { wrapper },
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('rowgroup'))
})

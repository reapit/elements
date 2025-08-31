import { buildTableWrapper } from '../../__story__/table-wrapper'
import { render, screen } from '@testing-library/react'
import { TableBody } from '../body'

const wrapper = buildTableWrapper('body')

test('renders as a rowgroup element by default', () => {
  render(
    <TableBody>
      <tr />
    </TableBody>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableBody as="div">Foo</TableBody>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('rowgroup')).not.toBeInTheDocument()
})

test('has .el-table-body class', () => {
  render(
    <TableBody>
      <tr />
    </TableBody>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-body')
})

test('accepts other classes', () => {
  render(
    <TableBody className="custom-class">
      <tr />
    </TableBody>,
    { wrapper },
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-body custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <TableBody data-testid="test-id">
      <tr />
    </TableBody>,
    { wrapper },
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('rowgroup'))
})

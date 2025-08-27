import { render, screen } from '@testing-library/react'
import { TableBody } from '../body'

test('renders as a rowgroup element by default', () => {
  render(
    <TableBody>
      <tr />
    </TableBody>,
  )
  expect(screen.getByRole('rowgroup')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(
    <TableBody as="div">
      <div />
    </TableBody>,
  )
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('rowgroup')).not.toBeInTheDocument()
})

test('has .el-table-body class', () => {
  render(
    <TableBody>
      <tr />
    </TableBody>,
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-body')
})

test('accepts other classes', () => {
  render(
    <TableBody className="custom-class">
      <tr />
    </TableBody>,
  )
  expect(screen.getByRole('rowgroup')).toHaveClass('el-table-body custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <TableBody data-testid="test-id">
      <tr />
    </TableBody>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('rowgroup'))
})

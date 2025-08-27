import { render, screen } from '@testing-library/react'
import { TableRowPrimaryAction } from '../primary-action'

const href = 'https://fake.url'

test('renders as a link element', () => {
  render(<TableRowPrimaryAction href={href}>Action</TableRowPrimaryAction>)
  expect(screen.getByRole('link', { name: 'Action' })).toBeVisible()
})

test('has .el-table-row-primary-action class', () => {
  render(<TableRowPrimaryAction href={href}>Action</TableRowPrimaryAction>)
  expect(screen.getByRole('link')).toHaveClass('el-table-row-primary-action')
})

test('accepts other classes', () => {
  render(
    <TableRowPrimaryAction className="custom-class" href={href}>
      Action
    </TableRowPrimaryAction>,
  )
  expect(screen.getByRole('link')).toHaveClass('el-table-row-primary-action custom-class')
})

test('forwards additional props to the link', () => {
  render(
    <TableRowPrimaryAction data-testid="test-id" href={href}>
      Action
    </TableRowPrimaryAction>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('link'))
})

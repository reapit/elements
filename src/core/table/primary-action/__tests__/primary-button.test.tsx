import { render, screen } from '@testing-library/react'
import { TableRowPrimaryActionButton } from '../primary-action-button'

test('renders as a button element', () => {
  render(<TableRowPrimaryActionButton>Action</TableRowPrimaryActionButton>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test('has .el-table-row-primary-action class', () => {
  render(<TableRowPrimaryActionButton>Action</TableRowPrimaryActionButton>)
  expect(screen.getByRole('button')).toHaveClass('el-table-row-primary-action')
})

test('accepts other classes', () => {
  render(<TableRowPrimaryActionButton className="custom-class">Action</TableRowPrimaryActionButton>)
  expect(screen.getByRole('button')).toHaveClass('el-table-row-primary-action custom-class')
})

test('forwards additional props to the button', () => {
  render(<TableRowPrimaryActionButton data-testid="test-id">Action</TableRowPrimaryActionButton>)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

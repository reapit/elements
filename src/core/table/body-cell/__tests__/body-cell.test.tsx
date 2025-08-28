import { buildTableWrapper } from '../../__story__/table-wrapper'
import { render, screen } from '@testing-library/react'
import { TableBodyCell } from '../body-cell'

const wrapper = buildTableWrapper('body-cell')

test('renders as a cell element by default', () => {
  render(<TableBodyCell>Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('cell')).toBeVisible()
})

test('can render as a header cell', () => {
  render(<TableBodyCell as="th">Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('rowheader')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableBodyCell as="div">Content</TableBodyCell>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('cell')).not.toBeInTheDocument()
})

test('applies scope="row" when rendered as a header cell', () => {
  render(<TableBodyCell as="th">Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('rowheader')).toHaveAttribute('scope', 'row')
})

test('applies `data-justify-content` when `justifyContent` is provided', () => {
  render(<TableBodyCell justifyContent="end">Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('cell')).toHaveAttribute('data-justify-content', 'end')
})

test('has .el-table-body-cell class', () => {
  render(<TableBodyCell>Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('cell')).toHaveClass('el-table-body-cell')
})

test('accepts other classes', () => {
  render(<TableBodyCell className="custom-class">Content</TableBodyCell>, { wrapper })
  expect(screen.getByRole('cell')).toHaveClass('el-table-body-cell custom-class')
})

test('forwards additional props to the cell', () => {
  render(<TableBodyCell data-testid="test-id">Content</TableBodyCell>, { wrapper })
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('cell'))
})

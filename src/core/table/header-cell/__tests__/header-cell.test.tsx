import { buildTableWrapper } from '../../__story__/table-wrapper'
import { TableHeaderCell } from '../header-cell'
import { render, screen } from '@testing-library/react'

const wrapper = buildTableWrapper('header-cell')

test('renders as a header cell by default', () => {
  render(<TableHeaderCell as="th">Content</TableHeaderCell>, { wrapper })
  expect(screen.getByRole('columnheader')).toBeVisible()
})

test('renders as a cell when its empty and not being explicitly rendered as a div', () => {
  render(<TableHeaderCell />, { wrapper })
  expect(screen.getByRole('cell')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(<TableHeaderCell as="div">Content</TableHeaderCell>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('columnheader')).not.toBeInTheDocument()
})

test('applies scope="col" when rendered as a header cell', () => {
  render(<TableHeaderCell as="th">Content</TableHeaderCell>, { wrapper })
  expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col')
})

test('applies `data-justify-self` when `justifySelf` is provided', () => {
  render(<TableHeaderCell justifySelf="end">Content</TableHeaderCell>, { wrapper })
  expect(screen.getByRole('columnheader')).toHaveAttribute('data-justify-self', 'end')
})

test('has .el-table-header-cell class', () => {
  render(<TableHeaderCell>Content</TableHeaderCell>, { wrapper })
  expect(screen.getByRole('columnheader')).toHaveClass('el-table-header-cell')
})

test('accepts other classes', () => {
  render(<TableHeaderCell className="custom-class">Content</TableHeaderCell>, { wrapper })
  expect(screen.getByRole('columnheader')).toHaveClass('el-table-header-cell custom-class')
})

test('forwards additional props to the cell', () => {
  render(<TableHeaderCell data-testid="test-id">Content</TableHeaderCell>, { wrapper })
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('columnheader'))
})

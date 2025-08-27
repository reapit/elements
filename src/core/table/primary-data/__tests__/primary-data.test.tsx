import { render, screen } from '@testing-library/react'
import { TableCellPrimaryData } from '../primary-data'

test('renders as a div element', () => {
  const { container } = render(<TableCellPrimaryData>Data</TableCellPrimaryData>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('displays provided content', () => {
  render(<TableCellPrimaryData>Data</TableCellPrimaryData>)
  expect(screen.getByText('Data')).toBeVisible()
})

test('can display a leading icon', () => {
  render(<TableCellPrimaryData iconLeft="Left icon">Data</TableCellPrimaryData>)
  const leftIcon = screen.getByText('Left icon')
  expect(leftIcon).toBeVisible()
  expect(leftIcon).toHaveAttribute('data-placement', 'left')
  expect(leftIcon).toHaveRole('presentation')
})

test('can display a trailing icon', () => {
  render(<TableCellPrimaryData iconRight="Right icon">Data</TableCellPrimaryData>)
  const rightIcon = screen.getByText('Right icon')
  expect(rightIcon).toBeVisible()
  expect(rightIcon).toHaveAttribute('data-placement', 'right')
  expect(rightIcon).toHaveRole('presentation')
})

test('can display a leading and trailing icon', () => {
  render(
    <TableCellPrimaryData iconLeft="Left icon" iconRight="Right icon">
      Data
    </TableCellPrimaryData>,
  )
  expect(screen.getByText('Left icon')).toBeVisible()
  expect(screen.getByText('Right icon')).toBeVisible()
})

test('forwards additional props to the div element', () => {
  const { container } = render(<TableCellPrimaryData data-testid="test-id">Data</TableCellPrimaryData>)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

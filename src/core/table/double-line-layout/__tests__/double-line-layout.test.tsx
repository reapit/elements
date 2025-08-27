import { render, screen } from '@testing-library/react'
import { TableCellDoubleLineLayout } from '../double-line-layout'

test('renders as a div element', () => {
  const { container } = render(<TableCellDoubleLineLayout>Data</TableCellDoubleLineLayout>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('displays provided content', () => {
  render(<TableCellDoubleLineLayout>Data</TableCellDoubleLineLayout>)
  expect(screen.getByText('Data')).toBeVisible()
})

test('can display supplementary data', () => {
  render(<TableCellDoubleLineLayout supplementaryData="Supplementary data">Data</TableCellDoubleLineLayout>)
  expect(screen.getByText('Supplementary data')).toBeVisible()
})

test('can display a media item', () => {
  render(<TableCellDoubleLineLayout mediaItem="Media item">Data</TableCellDoubleLineLayout>)
  expect(screen.getByText('Media item')).toBeVisible()
})

test('forwards additional props to the div element', () => {
  const { container } = render(<TableCellDoubleLineLayout data-testid="test-id">Data</TableCellDoubleLineLayout>)
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})

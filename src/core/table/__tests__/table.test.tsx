import { render, screen } from '@testing-library/react'
import { Table } from '../table'

test('renders as a table element by default', () => {
  render(
    <Table columns="1fr">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toBeVisible()
})

test('can render as a div with no implicit role', () => {
  const { container } = render(
    <Table as="div" columns="1fr">
      <tbody />
    </Table>,
  )
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.queryByRole('table')).not.toBeInTheDocument()
})

test('displays children', () => {
  render(
    <Table columns="1fr" justifyItems="end">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('rowgroup')).toBeVisible()
})

test('has specified column justification', () => {
  render(
    <Table columns="1fr" justifyItems="end">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toHaveAttribute('data-justify-items', 'end')
})

test('has specified column template', () => {
  render(
    <Table columns="1fr minmax(100px, 200px)">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toHaveStyle('grid-template-columns: 1fr minmax(100px, 200px)')
})

test('accepts other inline styles', () => {
  render(
    <Table columns="1fr" style={{ backgroundColor: 'red' }}>
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toHaveStyle('background-color: red; grid-template-columns: 1fr')
})

test('has .el-table class', () => {
  render(
    <Table columns="1fr">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toHaveClass('el-table')
})

test('accepts other classes', () => {
  render(
    <Table className="custom-class" columns="1fr">
      <tbody />
    </Table>,
  )
  expect(screen.getByRole('table')).toHaveClass('el-table custom-class')
})

test('forwards additional props to the row', () => {
  render(
    <Table columns="1fr" data-testid="test-id">
      <tbody />
    </Table>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('table'))
})

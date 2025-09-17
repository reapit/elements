import { render, screen } from '@testing-library/react'
import { TableRowMoreActions } from '../more-actions'

test('renders a button element', () => {
  render(<TableRowMoreActions aria-label="More actions">Menu items</TableRowMoreActions>)
  expect(screen.getByRole('button', { name: 'More actions' })).toBeVisible()
})

test('renders a menu element', () => {
  render(<TableRowMoreActions aria-label="More actions">Menu items</TableRowMoreActions>)
  expect(screen.getByRole('menu', { name: 'More actions' })).toBeVisible()
})

test('uses generated ids by default', () => {
  render(<TableRowMoreActions aria-label="More actions">Menu items</TableRowMoreActions>)
  expect(screen.getByRole('button')).toHaveAttribute('id', expect.any(String))
  expect(screen.getByRole('menu')).toHaveAttribute('id', expect.any(String))
})

test('uses consumer-supplied id for the button when provided', () => {
  render(
    <TableRowMoreActions aria-label="More actions" id="my-id">
      Menu items
    </TableRowMoreActions>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('id', 'my-id')
})

test('forwards additional attributes to the button element', () => {
  render(
    <TableRowMoreActions aria-label="More actions" data-testid="test-id">
      Menu items
    </TableRowMoreActions>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

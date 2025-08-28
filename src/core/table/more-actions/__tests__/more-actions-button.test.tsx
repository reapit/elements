import { fireEvent, render, screen } from '@testing-library/react'
import { TableRowMoreActionsButton } from '../more-actions-button'

test('renders a button element', () => {
  render(<TableRowMoreActionsButton aria-label="More actions" />)
  expect(screen.getByRole('button', { name: 'More actions' })).toBeVisible()
})

test('does not call consumer-supplied onClick when aria-disabled', () => {
  const onClick = vi.fn()
  render(<TableRowMoreActionsButton aria-label="More actions" aria-disabled={true} onClick={onClick} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(onClick).not.toHaveBeenCalled()
})

test('prevents default event for clicks when aria-disabled', () => {
  const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault')
  render(<TableRowMoreActionsButton aria-label="More actions" aria-disabled={true} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(preventDefaultSpy).toHaveBeenCalled()
})

test('stops event propagation for clicks when aria-disabled', () => {
  const parentOnClick = vi.fn()
  render(
    <div onClick={parentOnClick}>
      <TableRowMoreActionsButton aria-label="More actions" aria-disabled={true} />
    </div>,
  )

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(parentOnClick).not.toHaveBeenCalled()
})

test('forwards additional attributes to the button element', () => {
  render(<TableRowMoreActionsButton aria-label="More actions" data-testid="test-id" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('button'))
})

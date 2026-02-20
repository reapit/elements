import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../submenu-item-button.stories'

const SubmenuItemButtonStories = composeStories(stories)

test('renders a button', () => {
  render(<SubmenuItemButtonStories.Example>Logout</SubmenuItemButtonStories.Example>)
  expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible()
})

test('triggers onClick handler when clicked', () => {
  const handleClick = vi.fn()

  render(<SubmenuItemButtonStories.Example onClick={handleClick} />)

  fireEvent.click(screen.getByRole('button'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('has type="button" by default', () => {
  render(<SubmenuItemButtonStories.Example />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('does not render badge when hasBadge is false', () => {
  render(<SubmenuItemButtonStories.Example />)
  const button = screen.getByRole('button')
  const spans = button.querySelectorAll('span')
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1)
})

test('renders badge when hasBadge is true', () => {
  render(<SubmenuItemButtonStories.Badge />)
  const button = screen.getByRole('button')
  const spans = button.querySelectorAll('span')
  // Should have both label and badge spans
  expect(spans.length).toBe(2)
})

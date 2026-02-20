import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../menu-item-button.stories'
import { elTopBarMenuDrawerMenuItem } from '../styles'

const MenuItemButtonStories = composeStories(stories)

test('renders a button', () => {
  render(<MenuItemButtonStories.Example>Action</MenuItemButtonStories.Example>)
  expect(screen.getByRole('button', { name: 'Action' })).toBeVisible()
})

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(<MenuItemButtonStories.Example className="my-custom-class" />)
  expect(screen.getByRole('button')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuItem} my-custom-class`)
})

test('triggers onClick handler when clicked', () => {
  const handleClick = vi.fn()

  render(<MenuItemButtonStories.Example onClick={handleClick} />)

  fireEvent.click(screen.getByRole('button'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('has type="button" by default', () => {
  render(<MenuItemButtonStories.Example />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('does not render badge when hasBadge is false', () => {
  render(<MenuItemButtonStories.Example />)
  const button = screen.getByRole('button')
  const spans = button.querySelectorAll('span')
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1)
})

test('renders badge when hasBadge is true', () => {
  render(<MenuItemButtonStories.Badge />)
  const button = screen.getByRole('button')
  const spans = button.querySelectorAll('span')
  // Should have both label and badge spans
  expect(spans.length).toBe(2)
})

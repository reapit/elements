import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../submenu-item-button.stories'

const SubmenuItemButtonStories = composeStories(stories)

test('renders a button', () => {
  render(<SubmenuItemButtonStories.Default>Logout</SubmenuItemButtonStories.Default>)
  expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible()
})

test('triggers onClick handler when clicked', () => {
  const handleClick = vi.fn()

  render(<SubmenuItemButtonStories.Default onClick={handleClick} />)

  fireEvent.click(screen.getByRole('button'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('has type="button" by default', () => {
  render(<SubmenuItemButtonStories.Default />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu.stories'

const SubmenuStories = composeStories(stories)

test('renders a list', () => {
  render(<SubmenuStories.Example />)
  expect(screen.getByRole('list')).toBeVisible()
})

test('renders list items as children', () => {
  render(<SubmenuStories.Example />)
  const list = screen.getByRole('list')
  expect(list.children).toHaveLength(3)
})

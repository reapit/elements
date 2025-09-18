import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../nav-icon-item-button.stories'

const TopBarNavIconItemStories = composeStories(stories)

test('renders as a button', () => {
  render(<TopBarNavIconItemStories.Example aria-label="My Item" />)
  expect(screen.getByRole('button', { name: 'My Item' })).toBeVisible()
})

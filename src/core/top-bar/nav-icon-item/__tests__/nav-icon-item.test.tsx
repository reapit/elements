import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../nav-icon-item.stories'

const TopBarNavIconItemStories = composeStories(stories)

test('renders as a link with an accessible name', () => {
  render(<TopBarNavIconItemStories.Example aria-label="My Item" />)
  expect(screen.getByRole('link')).toBeVisible()
})

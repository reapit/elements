import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu-item.stories'

const SubmenuItemStories = composeStories(stories)

test('renders a link', () => {
  render(<SubmenuItemStories.Example>Profile</SubmenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Profile' })).toBeVisible()
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(<SubmenuItemStories.Example>Profile</SubmenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(<SubmenuItemStories.Selected>Profile</SubmenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(<SubmenuItemStories.Example href="/settings/profile" />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/settings/profile')
})

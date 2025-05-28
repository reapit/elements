import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu-item.stories'

const SubmenuItemStories = composeStories(stories)

test('renders an <a> element', () => {
  render(<SubmenuItemStories.Example>Test item</SubmenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Test item' })).toBeVisible()
})

test('has `aria-current="false"` attribute present when `isActive={false}`', () => {
  render(<SubmenuItemStories.Example>Test item</SubmenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Test item' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute present when `isActive={true}`', () => {
  render(<SubmenuItemStories.Selected>Test item</SubmenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Test item' })).toHaveAttribute('aria-current', 'page')
})

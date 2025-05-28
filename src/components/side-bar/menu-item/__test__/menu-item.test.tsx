import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-item.stories'

const MenuItemStories = composeStories(stories)

test('renders an <a> element', () => {
  render(<MenuItemStories.Example href="/">Item</MenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test('icon is visible, but hidden from the accessibility tree', () => {
  render(
    <MenuItemStories.Example href="/" icon="😎">
      Item
    </MenuItemStories.Example>,
  )
  const icon = screen.getByText('😎')

  expect(icon).toBeVisible()
  expect(icon).toHaveAttribute('aria-hidden')
})

test('has `aria-current="page"` attribute present when `isActive`', () => {
  render(<MenuItemStories.Selected href="/">Item</MenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has an accessible name when the `SideBar` is collapsed', () => {
  render(<MenuItemStories.Collapsed href="/">Item</MenuItemStories.Collapsed>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

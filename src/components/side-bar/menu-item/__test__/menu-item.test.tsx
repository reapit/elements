import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-item.stories'
import { elSideBarMenuItem } from '../styles'

const MenuItemStories = composeStories(stories)

test('renders a link', () => {
  render(<MenuItemStories.Example>Item</MenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test(`combines the .${elSideBarMenuItem} and consumer-supplied classes correctly`, () => {
  render(<MenuItemStories.Example className="my-custom-class" />)
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elSideBarMenuItem} my-custom-class`)
})

test('icon is visible but hidden from the accessibility tree', () => {
  render(<MenuItemStories.Example icon="😎">Item</MenuItemStories.Example>)
  const icon = screen.getByText('😎')

  expect(icon).toBeVisible()
  expect(icon).toHaveAttribute('aria-hidden')
})

test('has `aria-current="page"` attribute present when `isActive`', () => {
  render(<MenuItemStories.Selected>Item</MenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has an accessible name when the `SideBar` is collapsed', () => {
  render(<MenuItemStories.Collapsed>Item</MenuItemStories.Collapsed>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

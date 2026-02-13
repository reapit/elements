import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-item.stories'
import { elTopBarMenuDrawerMenuItem } from '../styles'

const MenuItemStories = composeStories(stories)

test('renders a link', () => {
  render(<MenuItemStories.Example>Item</MenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(<MenuItemStories.Example className="my-custom-class" />)
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuItem} my-custom-class`)
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(<MenuItemStories.Example>Item</MenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(<MenuItemStories.Selected>Item</MenuItemStories.Selected>)
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(<MenuItemStories.Example href="/test" />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
})

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

test('does not render badge when hasBadge is false', () => {
  render(<MenuItemStories.Example />)
  // Badge spans have 2 children: label and potentially badge
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1)
})

test('renders badge when hasBadge is true', () => {
  render(<MenuItemStories.Badge />)
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should have both label and badge spans
  expect(spans.length).toBe(2)
})

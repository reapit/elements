import { composeStories } from '@storybook/react'
import { elTopBarNavItem } from '../styles'
import { render, screen } from '@testing-library/react'
import * as stories from '../nav-item.stories'

const NavItemStories = composeStories(stories)

test('renders an <a> element', () => {
  render(<NavItemStories.Example>Test item</NavItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Test item' })).toBeVisible()
})

test(`combines the .${elTopBarNavItem} and consumer-supplied classes correctly`, () => {
  render(<NavItemStories.Example className="my-custom-class" />)
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elTopBarNavItem} my-custom-class`)
})

test('has `aria-current="false"` attribute present when `isActive={false}`', () => {
  render(<NavItemStories.Example>Test item</NavItemStories.Example>)
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute present when `isActive={true}`', () => {
  render(<NavItemStories.Selected>Test item</NavItemStories.Selected>)
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

import { composeStories } from '@storybook/react'
import { elSideBarSubmenuItem } from '../styles'
import { render, screen } from '@testing-library/react'
import * as stories from '../submenu-item.stories'

const SubmenuItemStories = composeStories(stories)

test('renders an <a> element', () => {
  render(<SubmenuItemStories.Example>Test item</SubmenuItemStories.Example>)
  expect(screen.getByRole('link', { name: 'Test item' })).toBeVisible()
})

test(`combines the .${elSideBarSubmenuItem} and consumer-supplied classes correctly`, () => {
  render(<SubmenuItemStories.Example className="my-custom-class" />)
  // NOTE: We don't use the `toHaveClass` matcher here because it does not enforce the order of classes, which we are
  // specifically interested in here.
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elSideBarSubmenuItem} my-custom-class`)
})

test('has `aria-current="false"` attribute present when `isActive={false}`', () => {
  render(<SubmenuItemStories.Example>Test item</SubmenuItemStories.Example>)
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute present when `isActive={true}`', () => {
  render(<SubmenuItemStories.Selected>Test item</SubmenuItemStories.Selected>)
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

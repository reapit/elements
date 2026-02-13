import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../menu-group.stories'
import { elTopBarMenuDrawerMenuGroup } from '../styles'

const MenuGroupStories = composeStories(stories)

test('renders a <details> element', () => {
  render(<MenuGroupStories.Example />)
  const group = screen.getByRole('group')

  expect(group.tagName).toBe('DETAILS')
  expect(group).toBeInTheDocument()
})

test(`combines the .${elTopBarMenuDrawerMenuGroup} and consumer-supplied classes correctly`, () => {
  render(<MenuGroupStories.Example className="my-custom-class" />)
  expect(screen.getByRole('group')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuGroup} my-custom-class`)
})

test('is closed by default', () => {
  render(<MenuGroupStories.Example />)
  expect(screen.getByRole('group')).not.toBeVisible()
})

test('can be opened with open prop', () => {
  render(<MenuGroupStories.Example open />)
  expect(screen.getByRole('group')).toBeVisible()
})

test('applies isActive data attribute', () => {
  render(<MenuGroupStories.ManuallyActive />)
  expect(screen.getByRole('group')).toHaveAttribute('data-is-active', 'true')
})

test('renders summary and children correctly', () => {
  render(<MenuGroupStories.Example />)

  expect(screen.getByText('Settings')).toBeInTheDocument()
  expect(screen.getByText('Profile')).toBeInTheDocument()
})

test('is labelled by the <summary> element', () => {
  render(<MenuGroupStories.Selected />)
  const detailsElement = screen.getByRole('group')
  const summaryElement = screen.getByText('Settings').closest('summary')
  expect(detailsElement.getAttribute('aria-labelledby')).toBe(summaryElement?.id)
})

test('is open by default when a descendant submenu item represents the current page', () => {
  render(<MenuGroupStories.Selected />)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).toBeVisible()
})

test('is closed by default when NO descendant submenu items represent the current page', () => {
  render(<MenuGroupStories.Example />)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).not.toBeVisible()
})

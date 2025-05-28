import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { SideBarMenuGroup } from '../menu-group'
import * as stories from '../menu-group.stories'

const MenuGroupStories = composeStories(stories)

test('renders a <details> element', () => {
  render(<MenuGroupStories.Example />)
  const group = screen.getByRole('group')

  expect(group.tagName).toBe('DETAILS')
  expect(group).toBeInTheDocument()
})

test('has an accessible name when the `SideBar` is collapsed', () => {
  render(<MenuGroupStories.Collapsed summary={<SideBarMenuGroup.Summary icon="😎">Group</SideBarMenuGroup.Summary>} />)
  expect(screen.getByRole('group', { name: 'Group' })).toBeInTheDocument()
})

test('is labelled by the <summary> element', () => {
  render(<MenuGroupStories.Selected />)
  const detailsElement = screen.getByRole('group')
  const summaryElement = detailsElement.firstElementChild
  expect(detailsElement.getAttribute('aria-labelledby')).toBe(summaryElement?.id)
})

test('is closed by default when NO descendant submenu items represent the current page', () => {
  render(<MenuGroupStories.Example />)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).not.toBeVisible()
})

test('is open by default when a descendant submenu item represents the current page', () => {
  render(<MenuGroupStories.Selected />)
  // NOTE: <details> elements are only considered visible when they are open
  expect(screen.getByRole('group')).toBeVisible()
})

test('is closed when the `SideBar` is collapsed', () => {
  const { rerender } = render(<MenuGroupStories.Selected />)

  expect(screen.getByRole('group')).toBeVisible()

  // Simulate the `SideBar` being collapsed
  rerender(<MenuGroupStories.Collapsed />)

  expect(screen.getByRole('group')).not.toBeVisible()
})

test('is opened when the `SideBar` is expanded and a descendant submenu item represents the current page', () => {
  const { rerender } = render(<MenuGroupStories.SelectedAndCollapsed />)

  expect(screen.getByRole('group')).not.toBeVisible()

  // Simulate the `SideBar` being expanded
  rerender(<MenuGroupStories.Selected />)

  expect(screen.getByRole('group')).toBeVisible()
})

test('is opened when the `SideBar` is expanded and a descendant submenu item represents the current page', () => {
  const { rerender } = render(<MenuGroupStories.SelectedAndCollapsed />)

  expect(screen.getByRole('group')).not.toBeVisible()

  // Simulate the `SideBar` being expanded
  rerender(<MenuGroupStories.Selected />)

  expect(screen.getByRole('group')).toBeVisible()
})

import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../side-bar.stories'

const SideBarStories = composeStories(stories)

test('renders a navigation element with an accessible name of "Sidebar navigation"', () => {
  render(<SideBarStories.Example />)
  expect(screen.getByRole('navigation', { name: 'Sidebar navigation' })).toBeVisible()
})

test('allows the accessible name to be supplied by the consumer', () => {
  render(<SideBarStories.Example aria-label="My accessible name" />)
  expect(screen.getByRole('navigation', { name: 'My accessible name' })).toBeVisible()
})

test('has a `data-state="expanded" attribute when expanded', () => {
  // NOTE: the SideBar, under test, will be expanded because the viewport is wider than our
  // "wide screen" breakpoint. Thus, we need to collapse it manually.
  render(<SideBarStories.Example />)
  fireEvent.click(screen.getByRole('button', { name: 'Expand' }))
  expect(screen.getByRole('navigation')).toHaveAttribute('data-state', 'expanded')
})

test('has a `data-state="collapsed" attribute when collapsed', () => {
  // NOTE: the SideBar, under test, will be expanded because the viewport is wider than our
  // "wide screen" breakpoint.
  render(<SideBarStories.Example />)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-state', 'collapsed')
})

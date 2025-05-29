import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../app-switcher.stories'

const AppSwitcherStories = composeStories(stories)

test('menu is not visible by default', () => {
  render(<AppSwitcherStories.Default />)
  // NOTE: the underlying menu component currently assigns role="menu" to the content of the popover
  // which is not rendered when the menu is closed, hence our use of `queryByRole and `toBeInTheDocument`
  // instead of `getByRole` and `toBeVisible`.
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test('menu trigger button is visible', () => {
  render(<AppSwitcherStories.Default />)
  expect(screen.getByRole('button', { name: 'app switcher' })).toBeVisible()
})

test('the menu is visible when the trigger button is clicked', () => {
  render(<AppSwitcherStories.Default />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByRole('menu')).toBeVisible()
})

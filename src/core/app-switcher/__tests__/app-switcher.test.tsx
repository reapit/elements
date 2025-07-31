import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../app-switcher.stories'

const AppSwitcherStories = composeStories(stories)

test('app switcher button will open the menu when clicked', () => {
  render(<AppSwitcherStories.Example />)

  const trigger = screen.getByRole('button', { name: 'App Switcher' })
  const menu = screen.getByRole('menu')
  expect(trigger).toHaveAttribute('popovertarget', menu.id)
})

test('menu is labelled by the trigger button', () => {
  render(<AppSwitcherStories.Example />)
  expect(screen.getByRole('menu', { name: 'App Switcher' })).toBeVisible()
})

test('menu trigger button is visible', () => {
  render(<AppSwitcherStories.Example />)
  expect(screen.getByRole('button', { name: 'App Switcher' })).toBeVisible()
})

test('the menu is visible when the trigger button is clicked', () => {
  render(<AppSwitcherStories.Example />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByRole('menu')).toBeVisible()
})

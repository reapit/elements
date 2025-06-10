import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../../nav-icon-item/nav-icon-item-button.stories'

const TopBarNavIconItemStories = composeStories(stories)

test('renders as a button with an accessible name', () => {
  render(<TopBarNavIconItemStories.Example aria-label="My Item" />)
  expect(screen.getByRole('button', { name: 'My Item' })).toBeVisible()
})

test('forwards additional props to the button element', () => {
  const testId = 'nav-icon-item'
  render(<TopBarNavIconItemStories.Example data-testid={testId} />)

  const item = screen.getByTestId(testId)
  expect(item).toBeVisible()
})

test('can display a badge', () => {
  render(<TopBarNavIconItemStories.WithBadge onClick={() => void 0} />)
  const button = screen.getByRole('button', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})

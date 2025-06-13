import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../nav-icon-item-anchor.stories'

const TopBarNavIconItemStories = composeStories(stories)

test('renders as a link with an accessible name', () => {
  render(<TopBarNavIconItemStories.Example aria-label="My Item" />)
  expect(screen.getByRole('link', { name: 'My Item' })).toBeVisible()
})

test('forwards additional props to the link element', () => {
  const testId = 'nav-icon-item'
  render(<TopBarNavIconItemStories.Example data-testid={testId} />)

  const item = screen.getByTestId(testId)
  expect(item).toBeVisible()
})

test('can display a badge when `hasBadge` is `true`', () => {
  render(<TopBarNavIconItemStories.WithBadge />)
  const button = screen.getByRole('link', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})

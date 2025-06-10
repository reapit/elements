import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../nav-icon-item.stories'

const TopBarNavIconItemStories = composeStories(stories)

test('renders as a link when `as="a"` is provided', () => {
  render(<TopBarNavIconItemStories.Example aria-label="My Item" />)
  expect(screen.getByRole('link', { name: 'My Item' })).toBeVisible()
})

test('renders as a button when `as="button"` is provided', () => {
  render(<TopBarNavIconItemStories.AsButton aria-label="My Item" />)
  expect(screen.getByRole('button', { name: 'My Item' })).toBeVisible()
})

test('forwards additional props to the link element', () => {
  const testId = 'nav-icon-item'
  render(<TopBarNavIconItemStories.Example data-testid={testId} />)

  const item = screen.getByTestId(testId)
  expect(item).toBeVisible()
})

test('forwards additional props to the button element', () => {
  const testId = 'nav-icon-item'
  render(<TopBarNavIconItemStories.AsButton data-testid={testId} />)

  const item = screen.getByTestId(testId)
  expect(item).toBeVisible()
})

test('can display a badge when rendered as a link', () => {
  render(<TopBarNavIconItemStories.WithBadge />)
  const button = screen.getByRole('link', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})

test('can display a badge when rendered as a button', () => {
  render(<TopBarNavIconItemStories.WithBadge as="button" onClick={() => void 0} />)
  const button = screen.getByRole('button', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})

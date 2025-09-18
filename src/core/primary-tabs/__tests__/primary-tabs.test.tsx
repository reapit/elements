import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../primary-tabs.stories'

const PrimaryTabsStories = composeStories(stories)

test('renders as a navigation element with a list', () => {
  render(<PrimaryTabsStories.Example />)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('list')).toBeVisible()
})

test('has a default data-overflow of "visible"', () => {
  render(<PrimaryTabsStories.Example />)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'visible')
})

test('allows overriding the data-overflow', () => {
  render(<PrimaryTabsStories.Example overflow="scroll" />)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'scroll')
})

test('forwards additional props to the nav element', () => {
  render(<PrimaryTabsStories.Example data-testid="test" />)
  expect(screen.getByTestId('test')).toBeVisible()
})

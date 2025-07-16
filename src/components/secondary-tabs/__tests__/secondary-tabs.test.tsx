import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../secondary-tabs.stories'

const SecondaryTabsStories = composeStories(stories)

test('renders as a navigation element with a list', () => {
  render(<SecondaryTabsStories.Example />)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('list')).toBeVisible()
})

test('has a default data-overflow of "visible"', () => {
  render(<SecondaryTabsStories.Example />)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'visible')
})

test('allows overriding the data-overflow', () => {
  render(<SecondaryTabsStories.Example overflow="scroll" />)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'scroll')
})

test('forwards additional props to the nav element', () => {
  render(<SecondaryTabsStories.Example data-testid="test" />)
  expect(screen.getByTestId('test')).toBeVisible()
})

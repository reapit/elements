import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import * as stories from '../main-nav.stories'

const MainNavStories = composeStories(stories)

test('renders as a navigation element with a list', () => {
  render(<MainNavStories.Example />)

  const nav = screen.getByRole('navigation')
  expect(nav).toBeVisible()

  const list = screen.getByRole('list')
  expect(list).toBeVisible()
})

test('has a default aria-label of "Main navigation"', () => {
  render(<MainNavStories.Example />)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Main navigation')
})

test('allows overriding the aria-label', () => {
  render(<MainNavStories.Example aria-label="Custom label" />)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Custom label')
})

test('forwards additional props to the nav element', () => {
  render(<MainNavStories.Example data-testid="test" className="custom-class" />)

  const nav = screen.getByTestId('test')
  expect(nav).toHaveClass('custom-class')
})

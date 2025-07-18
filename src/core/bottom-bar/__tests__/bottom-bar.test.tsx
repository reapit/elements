import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import * as stories from '../bottom-bar.stories'

const BottomBarStories = composeStories(stories)

test('renders a navigation element', () => {
  render(<BottomBarStories.Example />)

  const nav = screen.getByRole('navigation')
  expect(nav).toBeVisible()
})

test('has a default aria-label of "Bottom navigation"', () => {
  render(<BottomBarStories.Example />)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Bottom navigation')
})

test('allows overriding the aria-label', () => {
  render(<BottomBarStories.Example aria-label="Custom label" />)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Custom label')
})

test('forwards additional props to the nav element', () => {
  render(<BottomBarStories.Example data-testid="test" className="custom-class" />)

  const nav = screen.getByTestId('test')
  expect(nav).toHaveClass('custom-class')
})

import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../nav-search-button.stories'

const NavSearchButtonStories = composeStories(stories)

test('has a default accessible name of "Search"', () => {
  render(<NavSearchButtonStories.Example />)
  expect(screen.getByRole('button', { name: 'Search' })).toBeVisible()
})

test('accepts a custom accessible name', () => {
  const customLabel = 'Custom Search Label'
  render(<NavSearchButtonStories.Example aria-label={customLabel} />)

  const button = screen.getByRole('button', { name: customLabel })
  expect(button).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<NavSearchButtonStories.Example onClick={onClick} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'search-button'
  render(<NavSearchButtonStories.Example data-testid={testId} />)

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('renders with search icon', () => {
  render(<NavSearchButtonStories.Example />)

  const button = screen.getByRole('button')
  const icon = button.querySelector('svg')
  expect(icon).toBeVisible()
})

test('can display a visual shortcut indicator', () => {
  render(<NavSearchButtonStories.Shortcut />)
  expect(screen.getByText('⌘K')).toBeVisible()
})

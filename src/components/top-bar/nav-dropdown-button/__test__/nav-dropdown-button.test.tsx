import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../nav-dropdown-button.stories'

const TopBarNavDropdownButtonStories = composeStories(stories)

test('renders a button element with children', () => {
  render(<TopBarNavDropdownButtonStories.Example>Test button</TopBarNavDropdownButtonStories.Example>)
  expect(screen.getByRole('button', { name: 'Test button' })).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<TopBarNavDropdownButtonStories.Example onClick={onClick}>Test button</TopBarNavDropdownButtonStories.Example>)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'search-button'
  render(
    <TopBarNavDropdownButtonStories.Example data-testid={testId}>Test button</TopBarNavDropdownButtonStories.Example>,
  )

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('renders with chevron icon', () => {
  render(<TopBarNavDropdownButtonStories.Example>Test button</TopBarNavDropdownButtonStories.Example>)

  const button = screen.getByRole('button')
  const icon = button.querySelector('svg')
  expect(icon).toBeVisible()
})

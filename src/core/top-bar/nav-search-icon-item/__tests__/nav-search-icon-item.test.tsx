import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../nav-search-icon-item.stories'

const NavSearchIconItemStories = composeStories(stories)

test('has a default accessible name of "Search"', () => {
  render(<NavSearchIconItemStories.Example />)

  const button = screen.getByRole('button', { name: 'Search' })
  expect(button).toBeVisible()
})

test('accepts a custom accessible name', () => {
  const customLabel = 'Custom Search Label'
  render(<NavSearchIconItemStories.Example aria-label={customLabel} />)

  const button = screen.getByRole('button', { name: customLabel })
  expect(button).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<NavSearchIconItemStories.Example onClick={onClick} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'search-button'
  render(<NavSearchIconItemStories.Example data-testid={testId} />)

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('renders with search icon', () => {
  render(<NavSearchIconItemStories.Example />)

  const button = screen.getByRole('button')
  const icon = button.querySelector('svg')
  expect(icon).toBeVisible()
})

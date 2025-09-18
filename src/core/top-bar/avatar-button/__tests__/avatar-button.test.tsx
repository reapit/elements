import { composeStories } from '@storybook/react-vite'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../avatar-button.stories'

const AvatarButtonStories = composeStories(stories)

test('renders a button element with avatar', () => {
  render(<AvatarButtonStories.Example>KD</AvatarButtonStories.Example>)
  expect(screen.getByRole('button')).toBeVisible()
  expect(screen.getByText('KD')).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<AvatarButtonStories.Example onClick={onClick}>KD</AvatarButtonStories.Example>)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'avatar-button'
  render(<AvatarButtonStories.Example data-testid={testId}>KD</AvatarButtonStories.Example>)

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('has correct default aria-label', () => {
  render(<AvatarButtonStories.Example>KD</AvatarButtonStories.Example>)
  expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Profile menu')
})

test('allows custom aria-label', () => {
  const customLabel = 'Custom menu label'
  render(<AvatarButtonStories.Example aria-label={customLabel}>KD</AvatarButtonStories.Example>)
  expect(screen.getByRole('button')).toHaveAttribute('aria-label', customLabel)
})

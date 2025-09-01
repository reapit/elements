import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../radio.stories'

const RadioStories = composeStories(stories)

test('renders default Radio with label and supplementary info', () => {
  render(<RadioStories.DefaultRadio />)

  // Verify visible text
  expect(screen.getByText('I am a radio')).toBeVisible()
  expect(screen.getByText('Supplementary Info')).toBeVisible()

  // Grab the input directly
  const radio = screen.getByRole('radio', { hidden: true })
  expect(radio).toBeInTheDocument()
})

test('marks Radio as required when isRequired is true', () => {
  render(<RadioStories.RequiredRadio />)

  const radio = screen.getByRole('radio', { hidden: true })
  expect(radio).toBeRequired()
})

test('disables Radio when disabled prop is true', () => {
  render(<RadioStories.DisabledRadio />)

  const radio = screen.getByRole('radio', { hidden: true })
  expect(radio).toBeDisabled()
})

test('applies error state when hasError is true', () => {
  render(<RadioStories.RadioError />)

  const wrapper = screen.getByText('I am a radio').closest('[data-error]')
  expect(wrapper).toHaveAttribute('data-error', 'true')
})

test('calls onChange when Radio is clicked', () => {
  const handleChange = vi.fn()
  render(<RadioStories.DefaultRadio onChange={handleChange} />)

  const radio = screen.getByRole('radio', { hidden: true })
  fireEvent.click(radio)

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(radio).toBeChecked()
})

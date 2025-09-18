import { composeStories } from '@storybook/react-vite'
import { render, screen, fireEvent } from '@testing-library/react'
import * as stories from '../radio-group.stories'

const RadioGroupStories = composeStories(stories)

test('renders default RadioGroup with label and children', () => {
  render(<RadioGroupStories.DefaultRadioGroup />)

  expect(screen.getByText('Select options')).toBeVisible()
  expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
  expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  expect(screen.getByLabelText('Option 3')).toBeInTheDocument()
})

test('displays supplementary info when vertical orientation', () => {
  render(<RadioGroupStories.RadioGroupWithSuplimentaryInfo />)

  expect(screen.getByText('Supplementary Info')).toBeVisible()
})

test('only one radio can be selected in required RadioGroup', () => {
  render(<RadioGroupStories.RadioGroupWithRequiredLabel />)

  const option1 = screen.getByLabelText('Option 1') as HTMLInputElement
  const option2 = screen.getByLabelText('Option 2') as HTMLInputElement
  const option3 = screen.getByLabelText('Option 3') as HTMLInputElement

  expect(option1.checked).toBe(false)
  expect(option2.checked).toBe(false)
  expect(option3.checked).toBe(false)

  fireEvent.click(option1)
  expect(option1.checked).toBe(true)
  expect(option2.checked).toBe(false)
  expect(option3.checked).toBe(false)

  fireEvent.click(option2)
  expect(option1.checked).toBe(false)
  expect(option2.checked).toBe(true)
  expect(option3.checked).toBe(false)
})

test('form validation fails if no radio is selected when required', () => {
  render(
    <form>
      <RadioGroupStories.RadioGroupWithRequiredLabel />
      <button type="submit">Submit</button>
    </form>,
  )

  const form = screen.getByText('Submit').closest('form')
  expect(form).toBeInTheDocument()

  const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement
  radio1.required = true

  fireEvent.submit(form!)
  expect(radio1.checkValidity()).toBe(false)
})

test('displays error message when errorMessage is provided', () => {
  render(<RadioGroupStories.RadioGroupError />)

  const error = screen.getByText('Error Message')
  expect(error).toBeVisible()

  const wrapper = error.closest('[data-error]')
  expect(wrapper).toHaveAttribute('data-error', 'true')
})

test('renders horizontal orientation correctly', () => {
  render(<RadioGroupStories.HorizontalRadioGroup />)

  const content = screen.getByRole('radiogroup')
  expect(content).toHaveAttribute('aria-orientation', 'horizontal')

  // Supplementary info exists but may be visually hidden
  expect(screen.queryByText('This will be hidden')).toBeInTheDocument()
})

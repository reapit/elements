import { RadioButton } from '../radio-button'
import { render, screen } from '@testing-library/react'

test('renders a radio', () => {
  render(<RadioButton label="Label" />)
  expect(screen.getByRole('radio', { name: 'Label' })).toBeVisible()
})

test('is described by the supplementary info, when provided', () => {
  render(<RadioButton label="Label" supplementaryInfo="Description" />)
  expect(screen.getByRole('radio')).toHaveAccessibleDescription('Description')
})

test('can be described by consumer-specified element', () => {
  render(
    <>
      <RadioButton aria-describedby="consumer-description" label="Label" supplementaryInfo="Description" />
      <span id="consumer-description">Consumer description</span>
    </>,
  )
  expect(screen.getByRole('radio')).toHaveAccessibleDescription('Consumer description')
})

test('forwards additional props to the radio', () => {
  render(<RadioButton data-testid="my-radio" label="Label" />)
  expect(screen.getByRole('radio')).toHaveAttribute('data-testid', 'my-radio')
})

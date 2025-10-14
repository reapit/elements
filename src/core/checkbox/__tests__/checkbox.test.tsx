import { Checkbox } from '../checkbox'
import { render, screen } from '@testing-library/react'

test('renders a checkbox', () => {
  render(<Checkbox label="Label" />)
  expect(screen.getByRole('checkbox', { name: 'Label' })).toBeVisible()
})

test('is described by the supplementary info, when provided', () => {
  render(<Checkbox label="Label" supplementaryInfo="Description" />)
  expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Description')
})

test('can be described by consumer-specified element', () => {
  render(
    <>
      <Checkbox aria-describedby="consumer-description" label="Label" supplementaryInfo="Description" />
      <span id="consumer-description">Consumer description</span>
    </>,
  )
  expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Consumer description')
})

test('can be indeterminate', () => {
  render(<Checkbox isIndeterminate label="Label" />)
  expect(screen.getByRole('checkbox')).toBePartiallyChecked()
})

test('forwards additional props to the checkbox', () => {
  render(<Checkbox data-testid="my-checkbox" label="Label" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-testid', 'my-checkbox')
})

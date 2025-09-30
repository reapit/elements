import { DateTimeInputPickerButton } from '../picker-button'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('#src/icons/calendar', () => ({ CalendarIcon: () => 'calendar icon' }))
vi.mock('#src/icons/time', () => ({ TimeIcon: () => 'time icon' }))

test('renders a button element', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('has aria-controls attribute', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-date-input')
})

test('displays a medium-sized button', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'medium')
})

test('displays a tertiary button', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test('has no button padding', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-has-no-padding', 'true')
})

test('always has type="button"', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-has-no-padding', 'true')
})

test('uses time icon for time variant', () => {
  render(<DateTimeInputPickerButton aria-controls="my-time-input" variant="time" />)
  expect(screen.getByText('time icon')).toBeVisible()
})

test('uses calendar icon for all other supported variants', () => {
  render(<DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />)
  expect(screen.getByText('calendar icon')).toBeVisible()
})

test('calls consumer-supplied `onClick`', () => {
  const onClick = vi.fn()
  render(<DateTimeInputPickerButton aria-controls="my-date-input" onClick={onClick} variant="date" />)

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalled()
})

test("focuses input and calls it's `showPicker` method when clicked", () => {
  const { container } = render(
    <>
      <input data-testid="input" id="my-date-input" type="date" />
      <DateTimeInputPickerButton aria-controls="my-date-input" variant="date" />
    </>,
  )
  const input = container.querySelector('input')!
  // NOTE: happy-dom doesn't seem to support the `showPicker` method on input elements, so we're
  // shoving one in. If support is added in future, we can spy on the method instead, just like we
  // are with `focus`.
  input.showPicker = vi.fn()
  vi.spyOn(input, 'focus')

  fireEvent.click(screen.getByRole('button'))

  expect(input.focus).toHaveBeenCalled()
  expect(input.showPicker).toHaveBeenCalled()
})

test("does NOT focus input or call it's `showPicker` method when default event behaviour is prevented", () => {
  const { container } = render(
    <>
      <input data-testid="input" id="my-date-input" type="date" />
      <DateTimeInputPickerButton
        aria-controls="my-date-input"
        onClick={(event) => event.preventDefault()}
        variant="date"
      />
    </>,
  )
  const input = container.querySelector('input')!
  // NOTE: happy-dom doesn't seem to support the `showPicker` method on input elements, so we're
  // shoving one in. If support is added in future, we can spy on the method instead, just like we
  // are with `focus`.
  input.showPicker = vi.fn()
  vi.spyOn(input, 'focus')

  fireEvent.click(screen.getByRole('button'))

  expect(input.focus).not.toHaveBeenCalled()
  expect(input.showPicker).not.toHaveBeenCalled()
})

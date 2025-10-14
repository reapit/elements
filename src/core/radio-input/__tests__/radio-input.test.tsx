import { RadioInput } from '../radio-input'
import { render, screen } from '@testing-library/react'

test('renders a radio element in a container div', () => {
  const { container } = render(<RadioInput />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.getByRole('radio')).toBeVisible()
  expect(screen.getByRole('radio').parentElement).toBe(container.firstElementChild)
})

test('applies `data-show-validity` attribute when `showValidity` is true', () => {
  render(<RadioInput showValidity />)
  expect(screen.getByRole('radio')).toHaveAttribute('data-show-validity', 'true')
})

// NOTE: we can't test the CSS `display: none` behaviour of the radio component
// because it relies CSS behaviour that does not appear to be supported by RTL or behaviour
// fake DOM environment. Hence, we simply test for the presence of the icons in the DOM.
test('displays an ARIA hidden unchecked icon with `data-show-when="unchecked"` attribute', () => {
  const { container } = render(<RadioInput />)
  const uncheckedIcon = container.querySelector('[data-show-when="unchecked"]')
  expect(uncheckedIcon).toBeInTheDocument()
  expect(uncheckedIcon).toHaveAttribute('aria-hidden', 'true')
})

test('displays an ARIA hidden checked icon with `data-show-when="checked"` attribute', () => {
  const { container } = render(<RadioInput checked />)
  const checkedIcon = container.querySelector('[data-show-when="checked"]')
  expect(checkedIcon).toBeInTheDocument()
  expect(checkedIcon).toHaveAttribute('aria-hidden', 'true')
})

test('forwards `className` to the root container element', () => {
  const { container } = render(<RadioInput className="my-class" />)
  expect(container.firstElementChild).toHaveClass('my-class')
  expect(screen.getByRole('radio')).not.toHaveClass('my-class')
})

test('forwards `style` to the root container element', () => {
  const { container } = render(<RadioInput style={{ color: 'red' }} />)
  expect(container.firstElementChild).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the radio element', () => {
  render(<RadioInput data-testid="my-radio" />)
  expect(screen.getByRole('radio')).toHaveAttribute('data-testid', 'my-radio')
})

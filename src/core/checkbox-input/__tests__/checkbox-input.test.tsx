import { CheckboxInput } from '../checkbox-input'
import { render, screen } from '@testing-library/react'

test('renders a checkbox element in a container div', () => {
  const { container } = render(<CheckboxInput />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.getByRole('checkbox')).toBeVisible()
  expect(screen.getByRole('checkbox').parentElement).toBe(container.firstElementChild)
})

test('applies `data-is-touched` attribute when `isTouched` is true', () => {
  render(<CheckboxInput isTouched />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-is-touched', 'true')
})

// NOTE: we can't test the CSS `display: none` behaviour of the checkbox component
// because it relies CSS behaviour that does not appear to be supported by RTL or behaviour
// fake DOM environment. Hence, we simply test for the presence of the icons in the DOM.
test('displays an ARIA hidden unchecked icon with `data-show-when="unchecked"` attribute', () => {
  const { container } = render(<CheckboxInput />)
  const uncheckedIcon = container.querySelector('[data-show-when="unchecked"]')
  expect(uncheckedIcon).toBeInTheDocument()
  expect(uncheckedIcon).toHaveAttribute('aria-hidden', 'true')
})

test('displays an ARIA hidden checked icon with `data-show-when="checked"` attribute', () => {
  const { container } = render(<CheckboxInput checked />)
  const checkedIcon = container.querySelector('[data-show-when="checked"]')
  expect(checkedIcon).toBeInTheDocument()
  expect(checkedIcon).toHaveAttribute('aria-hidden', 'true')
})

test('displays an ARIA hidden indeterminate icon with `data-show-when="indeterminate"` attribute', () => {
  const { container } = render(<CheckboxInput />)
  const indeterminateIcon = container.querySelector('[data-show-when="indeterminate"]')
  expect(indeterminateIcon).toBeInTheDocument()
  expect(indeterminateIcon).toHaveAttribute('aria-hidden', 'true')
})

test('forwards `className` to the root container element', () => {
  const { container } = render(<CheckboxInput className="my-class" />)
  expect(container.firstElementChild).toHaveClass('my-class')
  expect(screen.getByRole('checkbox')).not.toHaveClass('my-class')
})

test('forwards `style` to the root container element', () => {
  const { container } = render(<CheckboxInput style={{ color: 'red' }} />)
  expect(container.firstElementChild).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the checkbox element', () => {
  render(<CheckboxInput data-testid="my-checkbox" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-testid', 'my-checkbox')
})

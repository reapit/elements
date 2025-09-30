import { TextInput } from '../text-input'
import { render, screen } from '@testing-library/react'

test('renders an input element in a container div', () => {
  const { container } = render(<TextInput />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.getByRole('textbox')).toBeVisible()
  expect(screen.getByRole('textbox').parentElement).toBe(container.firstElementChild)
})

test('defaults to a text input', () => {
  render(<TextInput />)
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
})

test('defaults to left aligned text', () => {
  render(<TextInput />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-text-align', 'left')
})

test('defaults autoComplete to off', () => {
  render(<TextInput />)
  expect(screen.getByRole('textbox')).toHaveAttribute('autoComplete', 'off')
})

test('applies the correct input type', () => {
  render(<TextInput type="email" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
})

test('applies correct autoComplete when specified', () => {
  render(<TextInput autoComplete="on" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('autoComplete', 'on')
})

test('applies `data-is-touched` attribute when `isTouched` is true', () => {
  render(<TextInput isTouched />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-is-touched', 'true')
})

test('applies correct `data-size` attribute', () => {
  const { container } = render(<TextInput size="large" />)
  expect(container.firstElementChild).toHaveAttribute('data-size', 'large')
})

test('applies `data-text-align="right"` when suffix present', () => {
  render(<TextInput suffix="%" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-text-align', 'right')
})

test('displays leading icon when supplied', () => {
  render(<TextInput leadingIcon="leading icon" />)
  expect(screen.getByText('leading icon')).toBeVisible()
})

test('displays trailing icon when supplied', () => {
  render(<TextInput trailingIcon="trailing icon" />)
  expect(screen.getByText('trailing icon')).toBeVisible()
})

test('displays prefix when supplied', () => {
  render(<TextInput prefix="$" />)
  expect(screen.getByText('$')).toBeVisible()
})

test('displays suffix when supplied', () => {
  render(<TextInput suffix="%" />)
  expect(screen.getByText('%')).toBeVisible()
})

test('displays spinner when busy', () => {
  const { container } = render(<TextInput isBusy />)
  expect(container.querySelector('svg')).toBeVisible()
  expect(container.querySelector('svg')).toHaveClass('el-text-input-spinner')
})

test('forwards `className` to the root container element', () => {
  const { container } = render(<TextInput className="my-class" />)
  expect(container.firstElementChild).toHaveClass('my-class')
  expect(screen.getByRole('textbox')).not.toHaveClass('my-class')
})

test('forwards `style` to the root container element', () => {
  const { container } = render(<TextInput style={{ color: 'red' }} />)
  expect(container.firstElementChild).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the input element', () => {
  render(<TextInput data-testid="my-input" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-testid', 'my-input')
})

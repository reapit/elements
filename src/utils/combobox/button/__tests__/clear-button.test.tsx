import { ComboboxButtonClearButton } from '../clear-button'
import { clearListboxValue } from '#src/utils/listbox/dom-helpers'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('#src/utils/listbox/dom-helpers')

test('renders a button element', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('applies aria-controls attribute to the button', () => {
  render(<ComboboxButtonClearButton aria-controls="my-combobox" />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-combobox')
})

test('has aria-label of "Clear selection"', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('applies small size to the button', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'small')
})

test('applies tertiary variant to the button', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test('applies hasNoPadding prop to the button', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-has-no-padding', 'true')
})

test('displays close icon', () => {
  const { container } = render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()
})

test('calls clearListboxValue with aria-controls value when clicked', () => {
  render(<ComboboxButtonClearButton aria-controls="my-listbox" />)

  fireEvent.click(screen.getByRole('button'))

  expect(clearListboxValue).toHaveBeenCalledWith('my-listbox')
})

test('calls custom onClick handler when provided', () => {
  const onClick = vi.fn()
  render(<ComboboxButtonClearButton aria-controls="combobox-1" onClick={onClick} />)

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" data-testid="clear-btn" className="custom-class" />)
  expect(screen.getByTestId('clear-btn')).toBeVisible()
  expect(screen.getByTestId('clear-btn')).toHaveClass('custom-class')
})

test('uses default aria-label when not provided', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" />)
  expect(screen.getByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('uses custom aria-label when provided', () => {
  render(<ComboboxButtonClearButton aria-controls="combobox-1" aria-label="Remove selection" />)
  expect(screen.getByRole('button', { name: 'Remove selection' })).toBeVisible()
})

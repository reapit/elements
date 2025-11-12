import { ComboboxButtonTogglePopupButton } from '../toggle-popup-button'
import { fireEvent, render, screen } from '@testing-library/react'
import { toggleComboboxPopup } from '../../popup'

vi.mock('../../popup')

test('renders a button element', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('applies aria-controls attribute to the button', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="my-popup" />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-popup')
})

test('has aria-label of "Toggle popup"', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button', { name: 'Toggle popup' })).toBeVisible()
})

test('has tabIndex of -1', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '-1')
})

test('applies small size to the button', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'small')
})

test('applies tertiary variant to the button', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test('applies hasNoPadding prop to button', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-has-no-padding', 'true')
})

test('displays chevron down icon', () => {
  const { container } = render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()
})

test('calls togglePopup with aria-controls value when clicked', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="my-popup" />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(toggleComboboxPopup).toHaveBeenCalledWith('my-popup')
})

test('calls custom onClick handler when provided', () => {
  const onClick = vi.fn()
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" onClick={onClick} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" data-testid="toggle-btn" className="custom-class" />)
  expect(screen.getByTestId('toggle-btn')).toBeVisible()
  expect(screen.getByTestId('toggle-btn')).toHaveClass('custom-class')
})

test('uses default aria-label when not provided', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" />)
  expect(screen.getByRole('button', { name: 'Toggle popup' })).toBeVisible()
})

test('uses custom aria-label when provided', () => {
  render(<ComboboxButtonTogglePopupButton aria-controls="popup-1" aria-label="Open options" />)
  expect(screen.getByRole('button', { name: 'Open options' })).toBeVisible()
})

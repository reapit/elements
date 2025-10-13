import { fireEvent, render, screen } from '@testing-library/react'
import { SearchInputClearButton } from '../clear-button'

vi.mock('#src/icons/close', () => ({ CloseIcon: () => 'close icon' }))

test('renders a button element', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toBeVisible()
})

test('has aria-controls attribute', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'my-date-input')
})

test('displays a medium-sized button', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-size', 'medium')
})

test('displays a tertiary button', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'tertiary')
})

test('has no button padding', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toHaveAttribute('data-has-no-padding', 'true')
})

test('always has type="button"', () => {
  render(<SearchInputClearButton aria-controls="my-date-input" />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('uses close icon', () => {
  render(<SearchInputClearButton aria-controls="my-time-input" />)
  expect(screen.getByText('close icon')).toBeVisible()
})

test('focuses input and clears its value when clicked', () => {
  render(
    <>
      <input defaultValue="Test value" id="my-search-input" type="search" />
      <SearchInputClearButton aria-controls="my-search-input" />
    </>,
  )
  const input = screen.getByRole('searchbox')
  vi.spyOn(input, 'focus')

  fireEvent.click(screen.getByRole('button'))

  expect(input.focus).toHaveBeenCalled()
  expect(input).toHaveValue('')
})

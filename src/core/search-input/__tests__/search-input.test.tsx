import { SearchInput } from '../search-input'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('#src/icons/search', () => ({ SearchIcon: () => 'search icon' }))

test('renders a searchbox element in a container div', () => {
  // NOTE: search inputs do not have an implicit role that we can use with getByRole. Instead, we need
  // to use a different query, hence `getByTestId` and the need to provide a `data-testid`
  const { container } = render(<SearchInput />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.getByRole('searchbox')).toBeVisible()
  expect(screen.getByRole('searchbox').parentElement).toBe(container.firstElementChild)
})

test('has an auto-generated ID by default', () => {
  render(<SearchInput readOnly />)
  expect(screen.queryByRole('searchbox')).toHaveAttribute('id')
})

test('uses consumer-supplied ID when provided', () => {
  render(<SearchInput id="my-id" readOnly />)
  expect(screen.queryByRole('searchbox')).toHaveAttribute('id', 'my-id')
})

test('displays leading search icon when input is empty and not focused', () => {
  render(<SearchInput defaultValue="" />)
  expect(screen.getByText('search icon')).toBeVisible()
})

test('displays leading search icon again when input loses focus (if still empty)', () => {
  render(<SearchInput defaultValue="" />)

  const input = screen.getByRole('searchbox')
  fireEvent.focus(input)
  expect(screen.queryByText('search icon')).not.toBeInTheDocument()

  fireEvent.blur(input)
  expect(screen.getByText('search icon')).toBeVisible()
})

test('displays leading search icon when input is readonly (regardless of focus)', () => {
  render(<SearchInput readOnly defaultValue="" />)
  expect(screen.getByText('search icon')).toBeVisible()
})

test('displays leading search icon when input is readonly with a value', () => {
  render(<SearchInput readOnly defaultValue="test" />)
  expect(screen.getByText('search icon')).toBeVisible()
})

test('hides leading search icon when input has a value', () => {
  render(<SearchInput defaultValue="test" />)
  expect(screen.queryByText('search icon')).not.toBeInTheDocument()
})

test('hides leading search icon when input is focused (even if empty)', () => {
  render(<SearchInput defaultValue="" />)

  const input = screen.getByRole('searchbox')
  expect(screen.getByText('search icon')).toBeVisible()

  fireEvent.focus(input)
  expect(screen.queryByText('search icon')).not.toBeInTheDocument()
})

test('displays clear button when it has a value', () => {
  render(<SearchInput defaultValue="test" />)
  expect(screen.getByRole('button', { name: 'Clear' })).toBeVisible()
})

test('hides clear button when read-only', () => {
  render(<SearchInput readOnly />)
  expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
})

test('hides clear button when disabled', () => {
  render(<SearchInput disabled />)
  expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
})

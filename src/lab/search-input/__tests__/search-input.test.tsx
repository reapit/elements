import { composeStories } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'
import * as stories from '../search-input.stories'

const SearchInputStories = composeStories(stories)

test('renders default SearchInput with placeholder', () => {
  render(<SearchInputStories.Default />)
  expect(screen.getByPlaceholderText('Search')).toBeVisible()
})

test('calls onSearch when typing in the input', () => {
  const handleSearch = vi.fn()
  render(<SearchInputStories.Default onSearch={handleSearch} />)

  const input = screen.getByPlaceholderText('Search')
  fireEvent.change(input, { target: { value: 'hello' } })

  expect(handleSearch).toHaveBeenCalledWith('hello')
  expect(input).toHaveValue('hello')
})

test('shows clear button when text is entered', () => {
  render(<SearchInputStories.Default />)

  const input = screen.getByPlaceholderText('Search')
  fireEvent.change(input, { target: { value: 'clear me' } })

  expect(screen.getByRole('button')).toBeVisible()
})

test('clicking clear button resets input value', () => {
  const handleSearch = vi.fn()
  render(<SearchInputStories.Default onSearch={handleSearch} />)

  const input = screen.getByPlaceholderText('Search')
  fireEvent.change(input, { target: { value: 'test' } })

  const clearButton = screen.getByRole('button')
  fireEvent.click(clearButton)

  expect(input).toHaveValue('')
  expect(handleSearch).toHaveBeenCalledWith('')
})

test('does not allow typing when disabled', () => {
  const handleSearch = vi.fn()
  render(<SearchInputStories.IsDisabled onSearch={handleSearch} />)

  const input = screen.getByPlaceholderText('Search')
  expect(input).toBeDisabled()
})

test('applies large size when inputSize="large"', () => {
  render(<SearchInputStories.SizeLarge />)
  expect(screen.getByPlaceholderText('Search').closest('div')).toHaveAttribute('data-size', 'large')
})

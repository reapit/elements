import { render, screen, fireEvent } from '@testing-library/react'
import { SearchInput } from '../index'

describe('SearchInput', () => {
  test('should match snapshot (default)', () => {
    const { asFragment } = render(<SearchInput />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot when disabled', () => {
    const { asFragment } = render(<SearchInput isDisabled />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with large size', () => {
    const { asFragment } = render(<SearchInput inputSize="large" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should call onSearch when typing', () => {
    const handleSearch = vi.fn()
    render(<SearchInput onSearch={handleSearch} placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'hello' } })
    expect(handleSearch).toHaveBeenCalledWith('hello')
    expect(input).toHaveValue('hello')
  })

  test('should show clear button and clear input when clicked', () => {
    const handleSearch = vi.fn()
    render(<SearchInput onSearch={handleSearch} placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'test' } })

    // Clear button should now be visible
    const clearButton = screen.getByRole('button')
    expect(clearButton).toBeInTheDocument()

    fireEvent.click(clearButton)

    expect(handleSearch).toHaveBeenCalledWith('') // cleared
    expect(input).toHaveValue('')
  })

  test('should not update value when disabled', () => {
    const handleSearch = vi.fn()
    render(<SearchInput isDisabled onSearch={handleSearch} placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'blocked' } })

    expect(handleSearch).not.toHaveBeenCalled()
    expect(input).toHaveValue('') // still empty
  })
})

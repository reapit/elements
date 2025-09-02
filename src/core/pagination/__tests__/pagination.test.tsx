import { fireEvent, render, screen } from '@testing-library/react'
import { Pagination } from '../pagination'

test('renders as a navigation element with a child list element', () => {
  render(<Pagination leftAction="Left action" pageCount={3} pageNumber={2} rightAction="Right action" />)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('list')).toBeVisible()
  expect(screen.getByRole('navigation').firstElementChild).toBe(screen.getByRole('list'))
})

test('displays the left action', () => {
  render(<Pagination leftAction="Left action" pageCount={3} pageNumber={2} rightAction="Right action" />)
  expect(screen.getByText('Left action')).toBeVisible()
})

test('displays the rigth action', () => {
  render(<Pagination leftAction="Left action" pageCount={3} pageNumber={2} rightAction="Right action" />)
  expect(screen.getByText('Right action')).toBeVisible()
})

test('displays the current page number and total page count in the format "X of Y"', () => {
  render(<Pagination leftAction="Left action" pageCount={3} pageNumber={2} rightAction="Right action" />)
  expect(screen.getByText('2 of 3')).toBeVisible()
})

describe('deprecated behaviour', () => {
  test('onPageChange called with next page number when next page button is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination onPageChange={onPageChange} pageCount={3} pageNumber={2} />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  test('onPageChange called with previous page number when previous page button is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination onPageChange={onPageChange} pageCount={3} pageNumber={2} />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to previous page' }))

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  test('previous page link is disabled when on the first page', () => {
    render(<Pagination pageCount={3} pageNumber={1} />)
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toHaveAttribute('aria-disabled', 'true')
  })

  test('next page link is disabled when on the last page', () => {
    render(<Pagination pageCount={3} pageNumber={3} />)
    expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveAttribute('aria-disabled', 'true')
  })
})

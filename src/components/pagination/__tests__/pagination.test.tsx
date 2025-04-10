import { act, fireEvent, render } from '@testing-library/react'
import { Pagination, PaginationProps } from '../pagination'

describe('Pagination', () => {
  const mockOnPageChange = vi.fn()
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should able to increment', () => {
    const { getByRole } = renderComponent({ currentPage: 1, pageCount: 3 })

    act(() => {
      fireEvent.click(
        getByRole('button', {
          name: 'Go to next page',
        }),
      )
    })
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('should able to decrement', () => {
    const { getByRole } = renderComponent({ currentPage: 3, pageCount: 3 })

    act(() => {
      fireEvent.click(
        getByRole('button', {
          name: 'Go to previous page',
        }),
      )
    })
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('should not decrement when current page is 1', () => {
    const { getByRole } = renderComponent({ currentPage: 1, pageCount: 3 })

    act(() => {
      fireEvent.click(
        getByRole('button', {
          name: 'Go to previous page',
        }),
      )
    })
    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  it('should not increment when is a last page', () => {
    const { getByRole } = renderComponent({ currentPage: 3, pageCount: 3 })

    act(() => {
      fireEvent.click(
        getByRole('button', {
          name: 'Go to next page',
        }),
      )
    })
    expect(mockOnPageChange).not.toHaveBeenCalled()
  })

  const renderComponent = (props?: Partial<PaginationProps>) => {
    return render(<Pagination currentPage={1} pageCount={3} {...props} onPageChange={mockOnPageChange} />)
  }
})

import { render, fireEvent } from '@testing-library/react'
import {
  DeprecatedPaginationWrap,
  DeprecatedPaginationText,
  DeprecatedPaginationButton,
  DeprecatedPagination,
  deprecatedHandlePageChange,
  deprecatedHandlePageInputChange,
} from '../index'

describe('DeprecatedPaginationWrap', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <DeprecatedPaginationWrap>
        <div>I am a child</div>
      </DeprecatedPaginationWrap>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedPaginationText', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <DeprecatedPaginationText>
        <div>I am a child</div>
      </DeprecatedPaginationText>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedPaginationButton', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <DeprecatedPaginationButton>
        <div>I am a child</div>
      </DeprecatedPaginationButton>,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('DeprecatedPagination', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<DeprecatedPagination callback={vi.fn()} currentPage={2} numberPages={4} />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with start end buttons', () => {
    const wrapper = render(
      <DeprecatedPagination callback={vi.fn()} currentPage={2} numberPages={4} hasStartButton hasEndButton />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should callback onClick correctly', async () => {
    const mockCallback = vi.fn()

    const wrapper = render(<DeprecatedPagination callback={mockCallback} currentPage={2} numberPages={4} />)

    fireEvent.click(wrapper.getByTestId('back-button'))

    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback).toHaveBeenLastCalledWith(1)

    fireEvent.click(wrapper.getByTestId('forward-button'))

    expect(mockCallback).toHaveBeenCalledTimes(4)
    expect(mockCallback).toHaveBeenLastCalledWith(3)
  })
})

describe('deprecatedHandlePageChange', () => {
  it('should correctly call the callback on change', () => {
    const nextPage = 2
    const callback = vi.fn()
    const setInputValue = vi.fn()
    const curried = deprecatedHandlePageChange(nextPage, callback, setInputValue)

    curried()

    expect(callback).toHaveBeenCalledWith(nextPage)
    expect(setInputValue).toHaveBeenCalledWith(String(nextPage))
  })
})

describe('deprecatedHandlePageInputChange', () => {
  it('should correctly call the callback on change', () => {
    const numberPages = 3
    const currentPage = 2
    const inputValue = '3'
    const callback = vi.fn()
    const curried = deprecatedHandlePageInputChange(numberPages, currentPage, inputValue, callback)

    curried()

    expect(callback).toHaveBeenCalledWith(Number(inputValue))
  })
})

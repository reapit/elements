import { useRef } from 'react'
import { useClickOutside } from '..'
import { fireEvent, render } from '@testing-library/react'

const TestComponent = ({ onClickOutside, isUsingParent = true }) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClickOutside)

  if (isUsingParent) {
    return (
      <div>
        <div ref={ref}>Inside Element</div>
      </div>
    )
  } else {
    return <div ref={ref}>Inside Element</div>
  }
}

describe('useClickOutside', () => {
  const onClickOutside = jest.fn()
  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderElement = () =>
    render(
      <>
        <TestComponent onClickOutside={onClickOutside} />
        <div>Outside Element</div>
      </>,
    )

  describe('has parent ', () => {
    it('should call onClickOutside when clicking outside the element', () => {
      const { getByText } = renderElement()

      fireEvent.mouseDown(getByText('Outside Element'))
      expect(onClickOutside).toHaveBeenCalledTimes(1)
    })

    it('should not call onClickOutside when clicking inside the element', () => {
      const { getByText } = renderElement()

      fireEvent.mouseDown(getByText('Inside Element'))
      expect(onClickOutside).not.toHaveBeenCalled()
    })
  })

  describe("doesn't have parent", () => {
    it('should call onClickOutside when clicking outside the element', () => {
      const { getByText } = renderElement()

      fireEvent.mouseDown(getByText('Outside Element'))
      expect(onClickOutside).toHaveBeenCalledTimes(1)
    })

    it('should not call onClickOutside when clicking inside the element', () => {
      const { getByText } = renderElement()

      fireEvent.mouseDown(getByText('Inside Element'))
      expect(onClickOutside).not.toHaveBeenCalled()
    })
  })
})

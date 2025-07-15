import { fireEvent, render } from '@testing-library/react'
import { useRef } from 'react'
import { useClickOutside } from '..'

describe('useClickOutside', () => {
  const onClickOutside = vi.fn()
  afterEach(() => {
    vi.clearAllMocks()
  })

  const TestComponent = () => {
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, onClickOutside)

    return (
      <div>
        <div>
          <div ref={ref}>Inner Element</div> {/* e.g menu, menu popover, .etc */}
          Inside Element {/* e.g button trigger for popover, .etc */}
        </div>
        Outside Element
      </div>
    )
  }

  describe('has parent ', () => {
    it('should call onClickOutside when clicking outside the element', () => {
      const { getByText } = render(<TestComponent />)

      fireEvent.mouseDown(getByText('Outside Element'))
      expect(onClickOutside).toHaveBeenCalledTimes(1)
    })

    it('should not call onClickOutside when clicking inside the element', () => {
      const { getByText } = render(<TestComponent />)

      fireEvent.mouseDown(getByText('Inside Element'))
      fireEvent.mouseDown(getByText('Inner Element'))
      expect(onClickOutside).not.toHaveBeenCalled()
    })
  })
})

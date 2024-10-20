import { useRef } from 'react'
import { useClickOutside } from '..'
import { fireEvent, render } from '@testing-library/react'

const TestComponent = ({ onClickOutside }: { onClickOutside: VoidFunction }) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClickOutside)

  return (
    <div>
      <div ref={ref}>Inside Element</div>
    </div>
  )
}

describe('useClickOutside', () => {
  it('should call onClickOutside when clicking outside the element', () => {
    const onClickOutside = jest.fn()

    const { getByText } = render(
      <>
        <TestComponent onClickOutside={onClickOutside} />
        <div>Outside Element</div>
      </>,
    )

    fireEvent.mouseDown(getByText('Outside Element'))

    expect(onClickOutside).toHaveBeenCalledTimes(1)
  })

  it('should not call onClickOutside when clicking inside the element', () => {
    const onClickOutside = jest.fn()

    const { getByText } = render(
      <>
        <TestComponent onClickOutside={onClickOutside} />
        <div>Outside Element</div>
      </>,
    )

    fireEvent.mouseDown(getByText('Inside Element'))

    expect(onClickOutside).not.toHaveBeenCalled()
  })
})

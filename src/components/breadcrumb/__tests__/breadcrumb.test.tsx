import { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { BreadCrumb, handleNext } from '../breadcrumb'

describe('BreadCrumb', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <BreadCrumb
        defaultActiveIndex={3}
        items={[
          {
            text: 'Home',
            onClick: () => console.log('Home clicked'),
          },
          {
            text: 'Level 1',
            onClick: () => console.log('1 clicked'),
          },
          {
            text: 'Level 2',
            onClick: () => console.log('2 clicked'),
          },
          {
            text: 'Level 3',
            onClick: () => console.log('3 clicked'),
          },
        ]}
      >
        Hover here
      </BreadCrumb>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleNext', () => {
  it('should set active index and call onClick', () => {
    const setActive = vi.fn()
    const onClick = vi.fn()
    const index = 2

    const curried = handleNext(setActive, onClick, index)

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement>

    curried(mockEvent)

    expect(setActive).toHaveBeenCalledWith(index)
    expect(onClick).toHaveBeenCalled()
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should handle when event is not provided', () => {
    const setActive = vi.fn()
    const onClick = vi.fn()
    const index = 2

    const curried = handleNext(setActive, onClick, index)

    curried()

    expect(setActive).toHaveBeenCalledWith(index)
    expect(onClick).toHaveBeenCalled()
  })
})

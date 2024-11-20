import { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { MobileControls, clickEventHandler } from '..'

describe('MobileControls component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<MobileControls />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = render(
      <MobileControls
        isVisible
        buttonOnClick={() => console.log('Clicked Item One')}
        buttonIcon="add"
        mobileControlItems={[
          {
            label: 'Item One',
            onClick: () => console.log('Clicked Item One'),
          },
          {
            label: 'Item Two',
            onClick: () => console.log('Clicked Item Two'),
          },
          {
            label: 'Item Three',
            onClick: () => console.log('Clicked Item Three'),
          },
        ]}
      />,
    )
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('clickEventHandler', () => {
  it('should handle a click event', () => {
    const setActive = vi.fn()
    const onClick = vi.fn()
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement | HTMLDivElement>

    const curried = clickEventHandler(setActive, onClick)

    curried(event)

    expect(setActive).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

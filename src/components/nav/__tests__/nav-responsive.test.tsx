import React, { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { clickNavEventHandler, NavResponsive } from '../nav-responsive'
import { NavStateProvider } from '../../../hooks/use-nav-state'
import { MediaStateProvider } from '../../../hooks/use-media-query'

describe('NavResponsive component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <NavStateProvider>
        <MediaStateProvider>
          <NavResponsive
            defaultNavIndex={1}
            options={[
              {
                itemIndex: 0,
                callback: () => console.log('Navigating'),
              },
              {
                itemIndex: 1,
                callback: () => console.log('Navigating'),
                text: 'Apps',
                subItems: [
                  {
                    itemIndex: 0,
                    callback: () => console.log('Navigating'),
                    text: 'App List',
                  },
                  {
                    itemIndex: 1,
                    callback: () => console.log('Navigating'),
                    text: 'Create App',
                  },
                ],
              },
              {
                itemIndex: 2,
                callback: () => console.log('Navigating'),
                text: 'Analytics',
                subItems: [
                  {
                    itemIndex: 2,
                    callback: () => console.log('Navigating'),
                    text: 'Hits Per Day',
                  },
                  {
                    itemIndex: 3,
                    callback: () => console.log('Navigating'),
                    text: 'Weekly Hits',
                  },
                ],
              },
              {
                itemIndex: 3,
                href: 'https://marketplace.reapit.cloud',
                text: 'Marketplace',
              },
              {
                itemIndex: 4,
                callback: () => console.log('Logging out'),
                text: 'Logout',
              },
            ]}
          />
        </MediaStateProvider>
      </NavStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('clickNavEventHandler', () => {
  it('should handle a click event', () => {
    const setActive = vi.fn()
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement | HTMLDivElement>

    const curried = clickNavEventHandler(setActive)

    curried(event)

    expect(setActive).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

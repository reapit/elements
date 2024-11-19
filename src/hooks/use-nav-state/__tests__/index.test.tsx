import { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { UseNavState, NavStateProvider, useNavState } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'
import { PropsWithChildren } from '../../../types/core'

describe('NavStateProvider', () => {
  it('should match snapshot', () => {
    expect(render(<NavStateProvider />)).toMatchSnapshot()
  })
})

describe('useNavState', () => {
  it('should return pwaNavState and setPwaNavState', async () => {
    const { result } = renderHook<{}, UseNavState>(() => useNavState(), {
      wrapper: (props: PropsWithChildren) => <NavStateProvider>{props.children}</NavStateProvider>,
    })

    const newState = {
      navItemIndex: 1,
      navMenuOpen: true,
      navSubMenuIndex: 1,
      navSubItemIndex: 1,
      callback: vi.fn(),
    }

    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as MouseEvent<HTMLAnchorElement>

    expect(result.current.navState).toEqual({
      navItemIndex: null,
      navMenuOpen: false,
      navSubMenuIndex: null,
      navSubItemIndex: null,
    })

    act(() => {
      result.current.setNavState(newState)(event)
    })

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(newState.callback).toHaveBeenCalledTimes(1)
    expect(result.current.navState).toEqual(newState)
  })
})

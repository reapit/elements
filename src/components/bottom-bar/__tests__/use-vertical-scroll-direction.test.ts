import { RefObject } from 'react'
import { handleChangeScrollDirection, useVerticalScrollDirection } from '../use-vertical-scroll-direction'
import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-library/react'

describe('handleChangeScrollDirection', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call the setScrollStates function while acting to scroll down', () => {
    const mockSetScrollStates = vi.fn().mockImplementation(() => ({ previousTopPosition: 0 }))

    handleChangeScrollDirection({ scrollTop: 10 } as any, mockSetScrollStates)

    expect(mockSetScrollStates).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should call the setScrollStates function while acting to scroll up', () => {
    const mockSetScrollStates = vi.fn().mockImplementation(() => ({ previousTopPosition: 10 }))

    handleChangeScrollDirection({ scrollTop: 0 } as any, mockSetScrollStates)

    expect(mockSetScrollStates).toHaveBeenCalledWith(expect.any(Function))
  })
})

describe('useVerticalScrollDirection', () => {
  it('should trigger the scroll event listener', () => {
    const abort = vi.fn()
    vi.spyOn(AbortController.prototype, 'abort').mockImplementation(abort) as any

    const mockUseRef = {
      current: {
        scrollTop: 0,
        addEventListener: vi.fn(),
      },
    } as unknown as RefObject<HTMLElement>

    const render = renderHook(() => useVerticalScrollDirection(mockUseRef))

    expect(mockUseRef.current?.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), {
      signal: expect.any(AbortSignal),
    })

    expect(abort).not.toHaveBeenCalled()

    act(() => {
      render.unmount()
    })

    expect(abort).toHaveBeenCalledTimes(1)
  })
})

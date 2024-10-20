import { renderHook } from '@testing-library/react-hooks'
import { useMenu } from '..'
import { act } from '@testing-library/react'

describe('useMenu', () => {
  it('getTriggerProps should apply aria and class attributes correctly', () => {
    const { result } = renderHook(() => useMenu())

    const triggerProps = result.current.getTriggerProps({
      className: 'custom-class',
    })

    expect(triggerProps['aria-haspopup']).toBe(true)
    expect(triggerProps['aria-expanded']).toBe(false)
  })

  it('getPopoverProps should apply data-open attribute correctly', () => {
    const { result } = renderHook(() => useMenu())

    const popoverProps = result.current.getPopoverProps()

    expect(popoverProps['data-open']).toBe(false)

    act(() => {
      result.current.openMenu()
    })

    const updatedPopoverProps = result.current.getPopoverProps()

    expect(updatedPopoverProps['data-open']).toBe(true)
  })

  it('should toggle isOpen state when trigger is clicked', () => {
    const { result } = renderHook(() => useMenu())

    act(() => {
      const triggerProps = result.current.getTriggerProps()
      triggerProps.onClick?.({} as any)
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      const triggerProps = result.current.getTriggerProps()
      triggerProps.onClick?.({} as any)
    })

    expect(result.current.isOpen).toBe(false)
  })

  it('should open menu when openMenu is called', () => {
    const { result } = renderHook(() => useMenu())

    act(() => {
      result.current.openMenu()
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('should close menu when closeMenu is called', () => {
    const { result } = renderHook(() => useMenu())

    act(() => {
      result.current.openMenu()
    })

    act(() => {
      result.current.closeMenu()
    })

    expect(result.current.isOpen).toBe(false)
  })
})

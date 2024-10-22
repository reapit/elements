import { renderHook } from '@testing-library/react-hooks'
import { useMenu } from '..'

describe('useMenu', () => {
  it('getTriggerProps should apply aria and class attributes correctly', () => {
    const { result } = renderHook(() => useMenu())
    const triggerProps = result.current.getTriggerProps({
      className: 'custom-class',
    })

    expect(triggerProps['className']).toBe('custom-class')
    expect(triggerProps['aria-haspopup']).toBe(true)
    expect(triggerProps['aria-expanded']).toBe(false)
  })

  it('getPopoverProps should apply data-open attribute correctly', () => {
    const { result } = renderHook(() => useMenu())

    const popoverProps = result.current.getPopoverProps()
    const triggerProps = result.current.getTriggerProps()
    expect(popoverProps['data-open']).toBe(false)
    expect(triggerProps['aria-expanded']).toBe(false)

    result.current.openMenu()
    const updatedPopoverProps = result.current.getPopoverProps()
    const updatedTriggerProps = result.current.getTriggerProps()
    expect(updatedPopoverProps['data-open']).toBe(true)
    expect(updatedTriggerProps['aria-expanded']).toBe(true)
  })

  it('should toggle isOpen state when trigger is clicked', () => {
    const { result } = renderHook(() => useMenu())

    let triggerProps = result.current.getTriggerProps()
    triggerProps.onClick?.({} as any)

    expect(result.current.isOpen).toBe(true)

    triggerProps = result.current.getTriggerProps()
    triggerProps.onClick?.({} as any)

    expect(result.current.isOpen).toBe(false)
  })

  it('should open menu when openMenu is called', () => {
    const { result } = renderHook(() => useMenu())

    result.current.openMenu()
    expect(result.current.isOpen).toBe(true)
  })

  it('should close menu when closeMenu is called', () => {
    const { result } = renderHook(() => useMenu())

    result.current.closeMenu()
    expect(result.current.isOpen).toBe(false)
  })
})

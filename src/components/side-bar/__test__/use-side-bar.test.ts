import { renderHook } from '@testing-library/react-hooks'
import { useSideBar } from '../use-side-bar'

describe('useSideBar', () => {
  it('should open sidebar when openSideBar is called', () => {
    const { result } = renderHook(() => useSideBar())

    result.current.openSideBar()
    expect(result.current.isOpen).toBe(true)
  })

  it('should close sidebar when closeSideBar is called', () => {
    const { result } = renderHook(() => useSideBar())

    result.current.closeSideBar()
    expect(result.current.isOpen).toBe(false)
  })

  describe('getTriggerProps', () => {
    it('should toggle isOpen state and work as expected when the trigger is clicked', async () => {
      const mockAdditionalOnClick = vi.fn()
      const { result } = renderHook(() => useSideBar())

      const triggerProps = result.current.getTriggerProps({ onClick: mockAdditionalOnClick })
      triggerProps.onClick?.({} as any)

      expect(result.current.isOpen).toBe(false)

      triggerProps.onClick?.({} as any)

      expect(result.current.isOpen).toBe(true)
      expect(mockAdditionalOnClick).toHaveBeenCalledTimes(2)
    })

    it('should apply aria and class attributes correctly', () => {
      const { result } = renderHook(() => useSideBar())
      const triggerProps = result.current.getTriggerProps({
        className: 'custom-class',
      })

      expect(triggerProps['className']).toBe('custom-class')
      expect(triggerProps['aria-expanded']).toBe(true)
    })
  })
})

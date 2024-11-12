import { renderHook } from '@testing-library/react-hooks'
import { useMenu } from '..'

describe('useMenu', () => {
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

  describe('getTriggerProps', () => {
    it('should toggle isOpen state when trigger is clicked', () => {
      const { result } = renderHook(() => useMenu())

      let triggerProps = result.current.getTriggerProps()
      triggerProps.onClick?.({} as any)

      expect(result.current.isOpen).toBe(true)

      triggerProps = result.current.getTriggerProps()
      triggerProps.onClick?.({} as any)

      expect(result.current.isOpen).toBe(false)
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

    it('should apply aria and class attributes correctly', () => {
      const { result } = renderHook(() => useMenu())
      const triggerProps = result.current.getTriggerProps({
        className: 'custom-class',
      })

      expect(triggerProps['className']).toBe('custom-class')
      expect(triggerProps['aria-haspopup']).toBe(true)
      expect(triggerProps['aria-expanded']).toBe(false)
    })

    it('should focus the first menu item on ArrowDown key press', () => {
      const mockCustomOnKeyDown = jest.fn()
      const { result } = renderHook(() => useMenu())
      const triggerProps = result.current.getTriggerProps({
        onKeyDown: mockCustomOnKeyDown,
      })
      const mockFocusFn = jest.fn()
      const event = {
        key: 'ArrowDown',
        currentTarget: {
          parentElement: {
            querySelectorAll: () => [
              {
                focus: mockFocusFn,
              },
            ],
          },
        },
      } as unknown as React.KeyboardEvent<HTMLButtonElement>

      triggerProps.onKeyDown!(event)

      expect(mockFocusFn).toHaveBeenCalled()
      expect(mockCustomOnKeyDown).toHaveBeenCalled()
    })
  })

  describe('getPopoverProps', () => {
    it('should apply data-open attribute correctly', () => {
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

    describe('onKeyDown', () => {
      let mockEvent
      let mockMenuItems
      let mockTriggerButton

      const setMockActiveElement = (element: HTMLElement) => {
        Object.defineProperty(document, 'activeElement', {
          configurable: true,
          get: () => element,
        })
      }

      beforeEach(() => {
        mockMenuItems = [
          {
            focus: jest.fn(),
            click: jest.fn(),
          },
          {
            focus: jest.fn(),
            click: jest.fn(),
          },
        ]
        mockTriggerButton = {
          focus: jest.fn(),
        }
        mockEvent = {
          currentTarget: {
            querySelectorAll: () => mockMenuItems,
            querySelector: () => {
              return mockTriggerButton
            },
          },
        } as any
        setMockActiveElement(mockMenuItems[0])
      })

      it('should focus next item on ArrowDown key press', () => {
        const { result } = renderHook(() => useMenu())

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'ArrowDown',
        })
        expect(mockMenuItems[1].focus).toHaveBeenCalled()
        expect(mockMenuItems[0].focus).not.toHaveBeenCalled()
        setMockActiveElement(mockMenuItems[1])

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'ArrowDown',
        })
        expect(mockMenuItems[0].focus).toHaveBeenCalled()
      })

      it('should focus previous item on ArrowUp key press', () => {
        const { result } = renderHook(() => useMenu())

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'ArrowUp',
        })
        // focus to the last item because pressed arrow up key on the first item
        expect(mockMenuItems[1].focus).toHaveBeenCalled()

        setMockActiveElement(mockMenuItems[1])
        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'ArrowUp',
        })
        expect(mockMenuItems[0].focus).toHaveBeenCalled()
      })

      it('should focus button and close menu on Escape key press', () => {
        const { result } = renderHook(() => useMenu())
        result.current.openMenu()
        expect(result.current.isOpen).toBe(true)

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'Escape',
        })

        expect(result.current.isOpen).toBe(false)
        expect(mockTriggerButton.focus).toHaveBeenCalled()
      })

      it('should activate menu item on Enter or Space key press', () => {
        const { result } = renderHook(() => useMenu())

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: 'Enter',
        })
        expect(mockMenuItems[0].click).toHaveBeenCalled()

        result.current.getPopoverProps().onKeyDown!({
          ...mockEvent,
          key: ' ',
        })
        expect(mockMenuItems[0].click).toHaveBeenCalledTimes(2)
      })
    })

    describe('onBlur', () => {
      it('should close menu if focus moves outside', () => {
        const { result } = renderHook(() => useMenu())
        result.current.openMenu()
        expect(result.current.isOpen).toBe(true)

        result.current.getPopoverProps().onBlur!({
          currentTarget: {
            contains: () => false,
          },
          relatedTarget: null,
        } as any)
        expect(result.current.isOpen).toBe(false)
      })

      it('should not close menu if focus moves outside by clicking trigger button', () => {
        const { result } = renderHook(() => useMenu())
        result.current.openMenu()
        expect(result.current.isOpen).toBe(true)

        result.current.getPopoverProps().onBlur!({
          currentTarget: {
            contains: () => false,
            parentElement: {
              querySelector: () => 'trigger button',
            },
          },
          relatedTarget: 'trigger button',
        } as any)
        expect(result.current.isOpen).toBe(true)
      })
    })
  })
})

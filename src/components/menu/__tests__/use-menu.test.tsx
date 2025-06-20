import { act, renderHook } from '@testing-library/react'
import { useMenu } from '../use-menu'

describe('useMenu', () => {
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
      result.current.closeMenu()
    })
    expect(result.current.isOpen).toBe(false)
  })

  describe('getTriggerProps', () => {
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
      const mockCustomOnKeyDown = vi.fn()
      const { result } = renderHook(() => useMenu())
      const triggerProps = result.current.getTriggerProps({
        onKeyDown: mockCustomOnKeyDown,
      })
      const mockFocusFn = vi.fn()
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

      act(() => {
        result.current.openMenu()
      })
      expect(result.current.getPopoverProps()['data-open']).toBe(true)
      expect(result.current.getTriggerProps()['aria-expanded']).toBe(true)
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
            focus: vi.fn(),
            click: vi.fn(),
          },
          {
            focus: vi.fn(),
            click: vi.fn(),
          },
        ]
        mockTriggerButton = {
          focus: vi.fn(),
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
        act(() => {
          result.current.getPopoverProps().onKeyDown!({
            ...mockEvent,
            key: 'ArrowUp',
          })
        })
        expect(mockMenuItems[0].focus).toHaveBeenCalled()
      })

      it('should focus button and close menu on Escape key press', () => {
        const { result } = renderHook(() => useMenu())
        act(() => {
          result.current.openMenu()
        })
        expect(result.current.isOpen).toBe(true)

        act(() => {
          result.current.getPopoverProps().onKeyDown!({
            ...mockEvent,
            key: 'Escape',
          })
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
        act(() => {
          result.current.openMenu()
        })
        expect(result.current.isOpen).toBe(true)

        act(() => {
          result.current.getPopoverProps().onBlur!({
            currentTarget: {
              contains: () => false,
            },
            relatedTarget: null,
          } as any)
        })
        expect(result.current.isOpen).toBe(false)
      })

      it('should not close the menu on blur if focus is moving to the trigger button.', () => {
        const { result } = renderHook(() => useMenu())
        act(() => {
          result.current.openMenu()
        })
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

import { renderHook } from '@testing-library/react-hooks'
import { render, screen, fireEvent } from '@testing-library/react'
import { useTooltip } from '../use-tooltip'
import { Button } from '../../button'
import { Tooltip } from '../tooltip'
import { describe, expect, test } from 'vitest'

// Helper component to test hook behavior
const TooltipTestComponent = () => {
  const tooltip = useTooltip()

  return (
    <>
      <Button {...tooltip.getTriggerProps()}>Hover me</Button>
      <Tooltip {...tooltip.getTooltipProps()} description="Tooltip description" />
    </>
  )
}

describe('useTooltip', () => {
  test('should return tooltip and trigger props', () => {
    const { result } = renderHook(() => useTooltip())

    const triggerProps = result.current.getTriggerProps()
    const tooltipProps = result.current.getTooltipProps()

    expect(triggerProps).toHaveProperty('aria-describedby')
    expect(triggerProps).toHaveProperty('onFocus')
    expect(triggerProps).toHaveProperty('onBlur')
    expect(triggerProps).toHaveProperty('onMouseEnter')
    expect(triggerProps).toHaveProperty('onMouseLeave')

    expect(tooltipProps).toHaveProperty('id')
    expect(tooltipProps).toHaveProperty('role', 'tooltip')
    expect(tooltipProps).toHaveProperty('aria-hidden', true)
  })

  test('should position the tooltip correctly', () => {
    render(<TooltipTestComponent />)

    const trigger = screen.getByText('Hover me')

    fireEvent.mouseEnter(trigger)

    const tooltip = screen.getByText('Tooltip description')

    const tooltipStyle = window.getComputedStyle(tooltip)
    expect(tooltipStyle.position).toBe('absolute')
    // Result for top and left can be negative as we haven't added support for the overflowing tooltip over viewport
    // Once support is added remove '-' from the match below
    expect(tooltipStyle.transform).toMatch(/translate\(-?\d+px, -?\d+px\)/)
  })

  test('should clean up event listeners on unmount', () => {
    const { unmount } = render(<TooltipTestComponent />)

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})

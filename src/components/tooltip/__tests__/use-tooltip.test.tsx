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

const TooltipTruncatedTextComponent = () => {
  const mockId = 'mock-truncated-id'
  const tooltip = useTooltip({ truncationTargetId: mockId })
  return (
    <>
      <div id={mockId} {...tooltip.getTriggerProps()}>
        Text is truncated here
      </div>
      <Tooltip {...tooltip.getTooltipProps()} description="Tooltip Text is truncated here" />
    </>
  )
}

describe('useTooltip', () => {
  test('should return tooltip, trigger and truncation target props', () => {
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
    expect(tooltipProps).toHaveProperty('data-is-visible', false)
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

  test('should only display tooltip if text is truncated', async () => {
    render(<TooltipTruncatedTextComponent />)

    const trigger = screen.getByText('Text is truncated here')

    // Mock scrollWidth and clientWidth for truncated case
    vi.spyOn(trigger, 'scrollWidth', 'get').mockReturnValue(150)
    vi.spyOn(trigger, 'clientWidth', 'get').mockReturnValue(100)

    fireEvent.mouseEnter(trigger)

    // Ensure tooltip appears for truncated text
    expect(screen.queryByText('Tooltip Text is truncated here')).toBeInTheDocument()

    fireEvent.mouseLeave(trigger)

    // Mock non-truncated case
    vi.spyOn(trigger, 'scrollWidth', 'get').mockReturnValue(100)
    vi.spyOn(trigger, 'clientWidth', 'get').mockReturnValue(100)

    fireEvent.mouseEnter(trigger)

    // Ensure tooltip does not appear for non-truncated text
    expect(screen.queryByText('Tooltip Text is truncated here')).not.toBeInTheDocument()
  })

  test('should clean up event listeners on unmount for both components', () => {
    const { unmount: unmountTooltipTestComponent } = render(<TooltipTestComponent />)
    const { unmount: unmountTooltipTruncatedTextComponent } = render(<TooltipTruncatedTextComponent />)

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    // Unmount both components
    unmountTooltipTestComponent()
    unmountTooltipTruncatedTextComponent()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})

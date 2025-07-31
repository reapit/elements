import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useId } from '#src/storybook/random-id'
import calculatePopoverPosition from '../../helpers/calculatePopoverPosition'

/** @deprecated */
type UseTooltipOptions = {
  truncationTargetId?: string
}

/** @deprecated */
export const useDeprecatedTooltip = ({ truncationTargetId }: UseTooltipOptions = {}) => {
  const tooltipId = useRef(`tooltip-id-${useId()}`).current
  const [isVisible, setIsVisible] = useState(false)

  const show = () => {
    if (shouldShowTooltip()) {
      setIsVisible(true)
    }
  }
  const hide = () => setIsVisible(false)

  /**
   * Determines whether the Tooltip should be displayed.
   *
   * This function checks if a truncation target ID is provided and whether the
   * target element exists in the DOM. If no valid target is found, the Tooltip
   * is displayed by default. If the target element exists, it evaluates whether
   * its content is truncated by comparing `scrollWidth` and `clientWidth`.
   *
   * @returns {boolean} True if the Tooltip should be displayed, otherwise false.
   */
  const shouldShowTooltip = () => {
    // If no truncation ID is provided, assume a truncation check is not required.
    // In this case, return `true` to ensure the Tooltip is displayed.
    if (!truncationTargetId) return true

    const target = document.getElementById(truncationTargetId)
    // Fallback mechanism: If the target element is not found in the DOM, return `true` to ensure
    // the Tooltip is displayed by default.
    if (!target) return true

    // Determine if the target content is truncated by checking whether the element's scrollWidth
    // exceeds its clientWidth. If scrollWidth is larger, the content overflows and requires scrolling.
    // This check is useful for conditionally displaying a Tooltip when text truncation occurs.
    return target.scrollWidth > target.clientWidth // Check if text is truncated
  }

  const positionTooltip = () => {
    // To do (In Future): Tooltip/Trigger selector to use useRef once project upgraded to React 19
    // See: https://react.dev/reference/react/forwardRef
    // See: https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop
    const tooltip = document.querySelector<HTMLDivElement>(`[id="${tooltipId}"]`)
    const trigger = document.querySelector<HTMLElement>(`[data-visible-id="${tooltipId}"]`)

    if (!tooltip || !trigger) return

    // Default position to top
    const tooltipPosition = tooltip.getAttribute('data-position') || 'top'
    calculatePopoverPosition({ triggerElement: trigger, popoverElement: tooltip, position: tooltipPosition })
  }

  // Update tooltip position on visibility change or window resize
  useEffect(() => {
    if (isVisible) {
      positionTooltip()
      window.addEventListener('resize', positionTooltip)
      window.addEventListener('scroll', positionTooltip, true)
    }
    return () => {
      window.removeEventListener('resize', positionTooltip)
      window.removeEventListener('scroll', positionTooltip)
    }
  }, [isVisible])

  /** @deprecated */
  const getTriggerProps = (props?: HTMLAttributes<HTMLElement>) => ({
    ...props,
    'data-visible-id': tooltipId,
    'aria-describedby': tooltipId,
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      props?.onFocus?.(e)
      show()
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      props?.onBlur?.(e)
      hide()
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      props?.onMouseEnter?.(e)
      show()
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      props?.onMouseLeave?.(e)
      hide()
    },
  })

  /** @deprecated */
  const getTooltipProps = (props?: HTMLAttributes<HTMLDivElement>) => ({
    ...props,
    id: tooltipId,
    role: 'tooltip',
    'aria-hidden': !isVisible,
    'data-is-visible': isVisible,
    isVisible,
  })

  return { getTriggerProps, getTooltipProps }
}

import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useId } from '#src/storybook/random-id'

type UseTooltipOptions = {
  truncationTargetId?: string
}

export const useTooltip = ({ truncationTargetId }: UseTooltipOptions = {}) => {
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

    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    // Calculate scroll offsets
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

    // const viewportWidth = window.innerWidth
    // const viewportHeight = window.innerHeight
    const position = tooltip.getAttribute('data-position')

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 4
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'top-start':
        top = triggerRect.top + scrollTop - tooltipRect.height - 4
        left = triggerRect.left + scrollLeft
        break
      case 'top-end':
        top = triggerRect.top + scrollTop - tooltipRect.height - 4
        left = triggerRect.right + scrollLeft - tooltipRect.width
        break
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 4
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom-start':
        top = triggerRect.bottom + scrollTop + 4
        left = triggerRect.left + scrollLeft
        break
      case 'bottom-end':
        top = triggerRect.bottom + scrollTop + 4
        left = triggerRect.right + scrollLeft - tooltipRect.width
        break
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left + scrollLeft - tooltipRect.width - 4
        break
      case 'left-start':
        top = triggerRect.top + scrollTop
        left = triggerRect.left + scrollLeft - tooltipRect.width - 4
        break
      case 'left-end':
        top = triggerRect.bottom + scrollTop - tooltipRect.height
        left = triggerRect.left + scrollLeft - tooltipRect.width - 4
        break
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + scrollLeft + 4
        break
      case 'right-start':
        top = triggerRect.top + scrollTop
        left = triggerRect.right + scrollLeft + 4
        break
      case 'right-end':
        top = triggerRect.bottom + scrollTop - tooltipRect.height
        left = triggerRect.right + scrollLeft + 4
        break
      default:
        break
    }

    // Below are inline style applied to tooltip to position it relevant to respective trigger
    tooltip.style.position = 'absolute'
    tooltip.style.inset = '0px auto auto 0px'
    tooltip.style.transform = `translate(${left}px, ${top}px)`
    tooltip.style.margin = '0px'
  }

  // Update tooltip position on visibility change or window resize
  useEffect(() => {
    if (isVisible) {
      positionTooltip()
      window.addEventListener('resize', positionTooltip)
    }
    return () => window.removeEventListener('resize', positionTooltip)
  }, [isVisible])

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

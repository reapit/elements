export type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'

const validPositions: PopoverPosition[] = [
  'top',
  'bottom',
  'right',
  'left',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
]

export interface calculatePopoverPositionProps {
  triggerElement: HTMLElement
  popoverElement: HTMLElement
  popoverOffset?: number
  position?: string
}

/**
 * Calculates and positions a popover element relative to a trigger element based on the specified direction.
 *
 * Supports 12 different placement positions (e.g., top-start, bottom-end, right, etc.).
 * Automatically adjusts for screen boundaries, scroll positions, and scrollable parent containers to prevent overflow.
 *
 * Notes:
 * - Fallbacks to `bottom-start` if an invalid position is provided.
 * - Takes into account scrollbars and adjusts position accordingly.
 * - Includes future TODO to use `useRef` once React 19 is adopted.
 *
 * @param {HTMLElement} triggerElement - The element that triggers the popover.
 * @param {HTMLElement} popoverElement - The popover element to be positioned.
 * @param {string} [position='bottom-start'] - Preferred position of the popover.
 * @param {number} [popoverOffset=4] - The spacing between the trigger and popover.
 *
 * @deprecated
 */
const calculatePopoverPosition = ({
  triggerElement,
  popoverElement,
  position,
  popoverOffset = 4,
}: calculatePopoverPositionProps): void => {
  const safePosition: PopoverPosition = validPositions.includes(position as PopoverPosition)
    ? (position as PopoverPosition)
    : 'bottom-start'
  // To do (In Future): Popover/Trigger selector to use useRef once project upgraded to React 19
  // See: https://react.dev/reference/react/forwardRef
  // See: https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop

  if (!popoverElement || !triggerElement) return

  const triggerRect = triggerElement.getBoundingClientRect()
  const popoverRect = popoverElement.getBoundingClientRect()

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const clientWidth = document.body.clientWidth
  const clientHeight = document.body.clientHeight

  // This is a magic code to get nearest parent container which is scrollable
  const getScrollableContainer = (element: HTMLElement): HTMLElement => {
    while (element && element !== document.body) {
      const { overflowX, overflowY } = getComputedStyle(element)
      const isScrollableY =
        (overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight
      const isScrollableX =
        (overflowX === 'auto' || overflowX === 'scroll') && element.scrollWidth > element.clientWidth

      if (isScrollableY || isScrollableX) {
        return element
      }
      element = element.parentElement as HTMLElement
    }
    return document.documentElement
  }
  const scrollableContainer = getScrollableContainer(triggerElement)
  const parentRect = scrollableContainer?.getBoundingClientRect()

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

  const hasVerticalScrollbar = viewportWidth > clientWidth
  const hasHorizontalScrollbar = viewportHeight > clientHeight

  let top = 0
  let left = 0

  // For vertical scrollbar
  const verticalScrollbarOffset = hasVerticalScrollbar ? viewportWidth - clientWidth : 0
  // For horizontal scrollbar
  const horizontalScrollbarOffset = hasHorizontalScrollbar ? viewportHeight - clientHeight : 0

  const parentReactLeft = parentRect.left > 0 ? parentRect.left : 0

  const adjustLeft = () => {
    // When overflowing in left view
    if (left < scrollLeft + popoverOffset + parentReactLeft) {
      left = scrollLeft + popoverOffset + parentReactLeft
    }
    // When overflowing in right view
    if (left + popoverRect.width + popoverOffset + verticalScrollbarOffset > viewportWidth + scrollLeft) {
      left = viewportWidth + scrollLeft - popoverRect.width - popoverOffset - verticalScrollbarOffset
    }
  }

  const parentReactTop = parentRect.top > 0 ? parentRect.top : 0

  const adjustTop = () => {
    // When overflowing in bottom view
    if (
      top + popoverRect.height + popoverOffset + horizontalScrollbarOffset >
      viewportHeight + scrollTop + parentRect.top
    ) {
      top = viewportHeight + scrollTop + parentRect.top - popoverRect.height - popoverOffset - horizontalScrollbarOffset
    }
    // When overflowing in top view
    if (top < scrollTop + popoverOffset + parentReactTop) {
      top = scrollTop + popoverOffset + parentReactTop
    }
  }

  const adjustWhenOverflowTop = () => {
    if (top - scrollTop < parentRect.top) {
      top = triggerRect.bottom + scrollTop + popoverOffset
    }
  }

  const adjustWhenOverflowBottom = () => {
    if (top + popoverRect.height - scrollTop > parentRect.bottom) {
      top = triggerRect.top + scrollTop - popoverRect.height - popoverOffset
    }
  }

  const adjustWhenOverflowLeft = () => {
    if (left - scrollLeft < parentRect.left) {
      left = triggerRect.right + scrollLeft + popoverOffset
    }
  }

  const adjustWhenOverflowRight = () => {
    if (left + popoverRect.width - scrollLeft > viewportWidth) {
      left = triggerRect.left - popoverRect.width - popoverOffset + scrollLeft
    }
  }

  switch (safePosition) {
    case 'top':
      top = triggerRect.top + scrollTop - popoverRect.height - popoverOffset
      left = triggerRect.left + scrollLeft + (triggerRect.width - popoverRect.width) / 2

      adjustWhenOverflowTop()
      adjustLeft()
      break
    case 'top-start':
      top = triggerRect.top + scrollTop - popoverRect.height - popoverOffset
      left = triggerRect.left + scrollLeft

      adjustWhenOverflowTop()
      adjustLeft()
      break
    case 'top-end':
      top = triggerRect.top + scrollTop - popoverRect.height - popoverOffset
      left = triggerRect.right + scrollLeft - popoverRect.width

      adjustWhenOverflowTop()
      adjustLeft()
      break

    case 'bottom':
      top = triggerRect.bottom + scrollTop + popoverOffset
      left = triggerRect.left + scrollLeft + (triggerRect.width - popoverRect.width) / 2

      adjustWhenOverflowBottom()
      adjustLeft()
      break
    case 'bottom-start':
      top = triggerRect.bottom + scrollTop + popoverOffset
      left = triggerRect.left + scrollLeft

      adjustWhenOverflowBottom()
      adjustLeft()
      break
    case 'bottom-end':
      top = triggerRect.bottom + scrollTop + popoverOffset
      left = triggerRect.right + scrollLeft - popoverRect.width

      adjustWhenOverflowBottom()
      adjustLeft()
      break

    case 'left':
      top = triggerRect.top + scrollTop + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.left + scrollLeft - popoverRect.width - popoverOffset

      adjustWhenOverflowLeft()
      adjustTop()
      break
    case 'left-start':
      top = triggerRect.top + scrollTop
      left = triggerRect.left + scrollLeft - popoverRect.width - popoverOffset

      adjustWhenOverflowLeft()
      adjustTop()
      break
    case 'left-end':
      top = triggerRect.bottom + scrollTop - popoverRect.height
      left = triggerRect.left + scrollLeft - popoverRect.width - popoverOffset

      adjustWhenOverflowLeft()
      adjustTop()
      break
    case 'right':
      top = triggerRect.top + scrollTop + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.right + scrollLeft + popoverOffset

      adjustWhenOverflowRight()
      adjustTop()
      break
    case 'right-start':
      top = triggerRect.top + scrollTop
      left = triggerRect.right + scrollLeft + popoverOffset

      adjustWhenOverflowRight()
      adjustTop()
      break
    case 'right-end':
      top = triggerRect.bottom + scrollTop - popoverRect.height
      left = triggerRect.right + scrollLeft + popoverOffset

      adjustWhenOverflowRight()
      adjustTop()
      break
    default:
      break
  }

  // Below are inline style applied to popoverElement to position it relevant to respective triggerElement
  popoverElement.style.position = 'absolute'
  popoverElement.style.inset = '0px auto auto 0px'
  popoverElement.style.transform = `translate(${left}px, ${top}px)`
  popoverElement.style.margin = '0px'
}

export default calculatePopoverPosition

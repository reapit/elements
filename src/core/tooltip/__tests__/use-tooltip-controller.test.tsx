import { renderHook } from '@testing-library/react'
import { useTooltipController } from '../use-tooltip-controller'
import { isTooltipNeeded } from '../is-tooltip-needed'

// Mock Popover API methods
const mockShowPopover = vi.fn()
const mockHidePopover = vi.fn()

// Mock isTooltipNeeded function
vi.mock('../is-tooltip-needed')
const mockIsTooltipNeeded = vi.mocked(isTooltipNeeded)

let triggerElement: HTMLElement
let tooltipElement: HTMLElement

beforeEach(() => {
  // Create mock DOM elements
  tooltipElement = document.createElement('div')
  tooltipElement.id = 'test-tooltip'

  triggerElement = document.createElement('button')
  triggerElement.id = 'test-trigger'

  // Mock Popover API methods
  tooltipElement.showPopover = mockShowPopover
  tooltipElement.hidePopover = mockHidePopover

  // Add elements to DOM
  document.body.appendChild(triggerElement)
  document.body.appendChild(tooltipElement)

  // Default mock for isTooltipNeeded to return true
  mockIsTooltipNeeded.mockReturnValue(true)
})

afterEach(() => {
  // Clean up DOM
  document.body.removeChild(triggerElement)
  document.body.removeChild(tooltipElement)

  // Reset mocks
  mockShowPopover.mockClear()
  mockHidePopover.mockClear()
  mockIsTooltipNeeded.mockClear()
})

test('calls showPopover on anchor focus', () => {
  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  triggerElement.dispatchEvent(new Event('focus'))
  expect(mockShowPopover).toHaveBeenCalledTimes(1)
})

test('calls hidePopover on anchor blur', () => {
  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  triggerElement.dispatchEvent(new Event('blur'))
  expect(mockHidePopover).toHaveBeenCalledTimes(1)
})

test('calls showPopover on anchor mouseenter', () => {
  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  triggerElement.dispatchEvent(new Event('mouseenter'))
  expect(mockShowPopover).toHaveBeenCalledTimes(1)
})

test('calls hidePopover on anchor mouseleave when not focus-visible', () => {
  // Mock matches to return false for :focus-visible
  triggerElement.matches = vi.fn().mockReturnValue(false)

  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  triggerElement.dispatchEvent(new Event('mouseleave'))
  expect(mockHidePopover).toHaveBeenCalledTimes(1)
  expect(triggerElement.matches).toHaveBeenCalledWith(':focus-visible')
})

test('does not call hidePopover on anchor mouseleave when focus-visible', () => {
  // Mock matches to return true for :focus-visible
  triggerElement.matches = vi.fn().mockReturnValue(true)

  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  triggerElement.dispatchEvent(new Event('mouseleave'))
  expect(mockHidePopover).not.toHaveBeenCalled()
  expect(triggerElement.matches).toHaveBeenCalledWith(':focus-visible')
})

test('does not throw when elements do not exist', () => {
  expect(() => {
    renderHook(() =>
      useTooltipController({
        tooltipId: 'non-existent-tooltip',
        triggerId: 'non-existent-anchor',
      }),
    )
  }).not.toThrow()
})

test('removes event listeners on cleanup', () => {
  const { unmount } = renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
    }),
  )

  // Verify events work before unmount
  triggerElement.dispatchEvent(new Event('focus'))
  expect(mockShowPopover).toHaveBeenCalledTimes(1)

  // Unmount the hook
  unmount()

  // Events should no longer trigger after cleanup
  triggerElement.dispatchEvent(new Event('focus'))
  expect(mockShowPopover).toHaveBeenCalledTimes(1) // Still 1, not 2
})

test('does not show tooltip when isTooltipNeeded returns false', () => {
  // Mock isTooltipNeeded to return false
  mockIsTooltipNeeded.mockReturnValue(false)

  renderHook(() =>
    useTooltipController({
      tooltipId: 'test-tooltip',
      triggerId: 'test-trigger',
      truncationTargetId: 'test-truncation-target',
    }),
  )

  // Try all the trigger events
  triggerElement.dispatchEvent(new Event('focus'))
  triggerElement.dispatchEvent(new Event('mouseenter'))
  triggerElement.dispatchEvent(new Event('blur'))
  triggerElement.dispatchEvent(new Event('mouseleave'))

  expect(mockIsTooltipNeeded).toHaveBeenCalledWith('test-truncation-target')

  // None of the popover methods should be called
  expect(mockShowPopover).not.toHaveBeenCalled()
  expect(mockHidePopover).not.toHaveBeenCalled()
})

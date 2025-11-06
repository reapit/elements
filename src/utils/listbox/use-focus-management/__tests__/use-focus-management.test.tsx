import { renderHook } from '@testing-library/react'
import { useFocusManagement } from '../use-focus-management'
import { handleBlurEvent } from '../handle-blur-event'
import { handleFocusEvent } from '../handle-focus-event'
import { handleArrowNavigation } from '#src/utils/keyboard-navigation'
import { OPTION_SELECTOR } from '../../dom-helpers'

import type { FocusEvent, KeyboardEvent } from 'react'

vi.mock('../handle-blur-event')
vi.mock('../handle-focus-event')
vi.mock('#src/utils/keyboard-navigation')

beforeEach(() => {
  vi.clearAllMocks()
})

test('returns an object with onBlur, onFocus, and onKeyDown handlers', () => {
  const { result } = renderHook(() => useFocusManagement({}))

  expect(result.current).toMatchInlineSnapshot(`
    {
      "onBlur": [Function],
      "onFocus": [Function],
      "onKeyDown": [Function],
    }
  `)
})

test('calls user-provided onBlur handler if provided', () => {
  const userOnBlur = vi.fn()
  const { result } = renderHook(() => useFocusManagement({ onBlur: userOnBlur }))

  const event = createFocusEvent()
  result.current.onBlur(event)

  expect(userOnBlur).toHaveBeenCalledWith(event)
})

test('calls handleBlurEvent with the event', () => {
  const { result } = renderHook(() => useFocusManagement({}))

  const event = createFocusEvent()
  result.current.onBlur(event)

  expect(handleBlurEvent).toHaveBeenCalledWith(event)
})

test('does not throw when user onBlur is not provided', () => {
  const { result } = renderHook(() => useFocusManagement({}))
  expect(() => result.current.onBlur(createFocusEvent())).not.toThrow()
})

test('calls user-provided onFocus handler if provided', () => {
  const userOnFocus = vi.fn()
  const { result } = renderHook(() => useFocusManagement({ onFocus: userOnFocus }))

  const event = createFocusEvent()
  result.current.onFocus(event)

  expect(userOnFocus).toHaveBeenCalledWith(event)
})

test('calls handleFocusEvent with the event', () => {
  const { result } = renderHook(() => useFocusManagement({}))

  const event = createFocusEvent()
  result.current.onFocus(event)

  expect(handleFocusEvent).toHaveBeenCalledWith(event)
})

test('does not throw when user onFocus is not provided', () => {
  const { result } = renderHook(() => useFocusManagement({}))
  expect(() => result.current.onFocus(createFocusEvent())).not.toThrow()
})

test('calls user-provided onKeyDown handler if provided', () => {
  const userOnKeyDown = vi.fn()
  const { result } = renderHook(() => useFocusManagement({ onKeyDown: userOnKeyDown }))

  const event = createKeyboardEvent()
  result.current.onKeyDown(event)

  expect(userOnKeyDown).toHaveBeenCalledWith(event)
})

test('calls handleArrowNavigation with the event, selectionFollowsFocus, and OPTION_SELECTOR', () => {
  const { result } = renderHook(() => useFocusManagement({}))

  const event = createKeyboardEvent()
  result.current.onKeyDown(event)

  expect(handleArrowNavigation).toHaveBeenCalledWith(event, {
    selectors: OPTION_SELECTOR,
  })
})

test('does not throw when user onKeyDown is not provided', () => {
  const { result } = renderHook(() => useFocusManagement({}))
  expect(() => result.current.onKeyDown(createKeyboardEvent())).not.toThrow()
})

/**
 * Helper function to create a mock FocusEvent
 */
function createFocusEvent(): FocusEvent<HTMLDivElement> {
  return {
    currentTarget: document.createElement('div'),
    target: document.createElement('div'),
    relatedTarget: null,
    type: 'focus',
  } as FocusEvent<HTMLDivElement>
}

/**
 * Helper function to create a mock KeyboardEvent
 */
function createKeyboardEvent(): KeyboardEvent<HTMLDivElement> {
  return {
    currentTarget: document.createElement('div'),
    target: document.createElement('div'),
    key: 'ArrowDown',
    type: 'keydown',
  } as unknown as KeyboardEvent<HTMLDivElement>
}

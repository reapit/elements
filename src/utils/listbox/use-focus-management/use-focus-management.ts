import { handleArrowNavigation } from '#src/utils/keyboard-navigation'
import { handleBlurEvent } from './handle-blur-event'
import { handleFocusEvent } from './handle-focus-event'
import { OPTION_SELECTOR } from '../dom-helpers'

import type { FocusEventHandler, KeyboardEventHandler } from 'react'

export namespace useFocusManagement {
  export interface Input {
    /** Blur handler called before internal blur handling */
    onBlur?: FocusEventHandler<HTMLDivElement>
    /** Focus handler called before internal focus handling */
    onFocus?: FocusEventHandler<HTMLDivElement>
    /** Keydown handler called before internal keyboard navigation */
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>
  }

  export interface Output {
    /** Manages tab index when focus leaves the listbox */
    onBlur: FocusEventHandler<HTMLDivElement>
    /** Manages focus and selection when entering or moving within the listbox */
    onFocus: FocusEventHandler<HTMLDivElement>
    /** Enables arrow key navigation between options */
    onKeyDown: KeyboardEventHandler<HTMLDivElement>
  }
}

/**
 * Manages focus behavior and keyboard navigation for a listbox.
 * Provides event handlers implementing ARIA listbox keyboard interaction patterns.
 *
 * Orchestrates these focus-related behaviors:
 * - Arrow key navigation between options
 * - Focus management when entering/leaving the listbox
 * - Selection following focus (when enabled)
 * - Tab index management for roving tabindex pattern
 */
export function useFocusManagement({
  onBlur,
  onFocus,
  onKeyDown,
}: useFocusManagement.Input): useFocusManagement.Output {
  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlur?.(event)
    handleBlurEvent(event)
  }

  const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocus?.(event)
    handleFocusEvent(event)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event)
    handleArrowNavigation(event, { selectors: OPTION_SELECTOR })
  }

  return {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
  }
}

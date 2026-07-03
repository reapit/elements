import { clearActiveOption, navigateActiveDescendant } from '#src/utils/listbox/use-active-descendant'
import { determineSearchInputVariant } from './determine-search-input-variant'
import { isWidthBelow } from '#src/utils/breakpoints'
import { SearchInput } from '#src/core/search-input'
import { useComboboxContext } from '../context'
import { useComboboxPopupDialogContext } from '../popup-dialog/context'
import { useEffect, useRef } from 'react'
import { useMatchMedia } from '#src/utils/match-media'

import type { FocusEventHandler, KeyboardEventHandler } from 'react'

const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'])

// We omit
// - `variant`, because it is determined automatically based on the combobox popup's variant
// - `type`, because it is always 'text'
type AttributesToOmit = Extract<keyof SearchInput.Props, 'type' | 'variant'>

export namespace ComboboxSearchInput {
  export interface Props extends Omit<SearchInput.Props, AttributesToOmit> {
    /** The accessible label for the search input. */
    'aria-label': string
  }
}

/**
 * A search input for use within a Combobox.Popup component.
 *
 * This component automatically adapts its visual style based on the parent popup's variant:
 * - When the popup is a drawer, the input uses a borderless style
 * - When the popup is a popover, the input uses the default bordered style
 * - When the popup is set to auto, the style changes based on the viewport width
 *
 * @example
 * ```tsx
 * <Combobox>
 *   <Combobox.AutocompleteButton />
 *   <Combobox.Popup
 *     search={<Combobox.SearchInput placeholder="Search options..." />}
 *     variant="popover"
 *   >
 *     <Combobox.Listbox>
 *       <Combobox.Option value="1">Option 1</Combobox.Option>
 *     </Combobox.Listbox>
 *   </Combobox.Popup>
 * </Combobox>
 * ```
 */
export function ComboboxSearchInput(props: ComboboxSearchInput.Props) {
  const { variant: popupVariant } = useComboboxPopupDialogContext()
  const { listboxId, searchInputId } = useComboboxContext()

  const isXSBreakpoint = useMatchMedia(isWidthBelow('SM'))
  const variant = determineSearchInputVariant({ isXSBreakpoint, popupVariant })

  const inputRef = useRef<HTMLInputElement>(null)

  // If a keystroke filters the active option out of the DOM, React only commits the consumer's
  // re-render after this component's event handlers return, so the removal can't be detected
  // synchronously in onChange. Checking after every commit catches it as soon as it happens.
  useEffect(() => {
    const inputElement = inputRef.current
    if (!inputElement) return
    const activeId = inputElement.getAttribute('aria-activedescendant')
    if (activeId && !document.getElementById(activeId)) {
      const listboxElement = document.getElementById(listboxId)
      if (listboxElement) clearActiveOption(inputElement, listboxElement)
    }
  })

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    props.onKeyDown?.(event)
    if (event.defaultPrevented) return

    if (!NAV_KEYS.has(event.key)) return

    const listboxElement = document.getElementById(listboxId)
    if (!listboxElement) return

    navigateActiveDescendant(event, { ariaOwner: event.currentTarget, listboxElement })
  }

  // The listbox has tabIndex={-1} and never receives real DOM focus when paired with a search
  // input, so its own blur handling never fires. This input is the sole focus holder during
  // navigation, so its blur is the only place we can detect focus leaving and clear the
  // now-stale aria-activedescendant and active-option styling.
  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    props.onBlur?.(event)

    const listboxElement = document.getElementById(listboxId)
    if (listboxElement) clearActiveOption(event.currentTarget, listboxElement)
  }

  // Use "text" type because "search" inputs capture Escape key presses to clear
  // the input value, and we want Escape to close the combobox popup.
  return (
    <SearchInput
      {...props}
      aria-autocomplete="list"
      aria-controls={listboxId}
      id={searchInputId}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      ref={inputRef}
      type="text"
      variant={variant}
    />
  )
}

ComboboxSearchInput.displayName = 'Combobox.SearchInput'

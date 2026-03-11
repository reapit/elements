import { determineSearchInputVariant } from './determine-search-input-variant'
import { isWidthBelow } from '#src/utils/breakpoints'
import { SearchInput } from '#src/core/search-input'
import { useMatchMedia } from '#src/utils/match-media'
import { useComboboxPopupDialogContext } from '../popup-dialog'

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

  const isXSBreakpoint = useMatchMedia(isWidthBelow('SM'))
  const variant = determineSearchInputVariant({ isXSBreakpoint, popupVariant })

  // Use "text" type because "search" inputs capture Escape key presses to clear
  // the input value, and we want Escape to close the combobox popup.
  return <SearchInput {...props} type="text" variant={variant} />
}

ComboboxSearchInput.displayName = 'Combobox.SearchInput'

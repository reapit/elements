import { Combobox } from '#src/utils/combobox'
import type { ReactNode } from 'react'

export namespace AutocompletePopup {
  export interface Props extends Combobox.PopupProps {
    /** An Autocomplete.SearchInput for filtering options. */
    search: ReactNode
  }
}

/**
 * Autocomplete popups are used to display a list of options that match the user's input. The popup
 * must have an Autocomplete.SearchInput.
 *
 * By default, the popup closes automatically on single selection but remains open for multi-select.
 */
export function AutocompletePopup({ closeOnSelection = 'auto', ...rest }: AutocompletePopup.Props) {
  return <Combobox.Popup {...rest} closeOnSelection={closeOnSelection} />
}

AutocompletePopup.displayName = 'Autocomplete.Popup'

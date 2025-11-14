import { ComboboxAutocompleteButton } from './combobox-autocomplete-button'
import { ComboboxSelectButton } from './combobox-select-button'
import { ComboboxContext } from './context'
import { ComboboxListbox } from './listbox'
import { ComboboxPopup } from './combobox-popup'
import { ElCombobox } from './styles'
import { Listbox } from '#src/utils/listbox'
import { useId } from 'react'

import type { HTMLAttributes } from 'react'

export namespace Combobox {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Combobox button, popup, and other child components */
    children?: React.ReactNode
    /** Whether the combobox is disabled */
    disabled?: boolean
    /** Maximum width of the combobox. Defaults to 100% */
    maxWidth?: string
    /** Whether a selection is required */
    required?: boolean
    /** Whether to show validation state styling */
    showValidity?: boolean
  }
}

/**
 * A combobox is an input widget that has an associated popup. The popup enables users to choose
 * a value for the input from a collection.
 *
 * Provides context to descendant components for managing accessibility relationships and state.
 * Use with `Combobox.SelectButton` or `Combobox.AutocompleteButton`, `Combobox.Popup`, and
 * `Combobox.Listbox` to build a complete combobox pattern.
 *
 * @example
 * ```tsx
 * <Combobox required>
 *   <Combobox.SelectButton placeholder="Select an option" />
 *   <Combobox.Popup variant="popover">
 *     <Combobox.Listbox>
 *       <Combobox.Option value="1">Option 1</Combobox.Option>
 *       <Combobox.Option value="2">Option 2</Combobox.Option>
 *     </Combobox.Listbox>
 *   </Combobox.Popup>
 * </Combobox>
 * ```
 */
export function Combobox({
  children,
  disabled = false,
  maxWidth,
  required = false,
  showValidity = false,
  style,
  ...rest
}: Combobox.Props) {
  const buttonId = useId()
  const listboxId = useId()
  const popupId = useId()

  return (
    <ComboboxContext.Provider value={{ buttonId, disabled, listboxId, popupId, required }}>
      <ElCombobox {...rest} data-show-validity={showValidity} style={{ '--combobox-max-width': maxWidth, ...style }}>
        {children}
      </ElCombobox>
    </ComboboxContext.Provider>
  )
}

Combobox.getOptionLabel = ComboboxListbox.getOptionLabel
Combobox.getListboxValue = Listbox.getValue

Combobox.AutocompleteButton = ComboboxAutocompleteButton
Combobox.SelectButton = ComboboxSelectButton
Combobox.Popup = ComboboxPopup
Combobox.Listbox = ComboboxListbox
Combobox.Option = ComboboxListbox.Option
Combobox.Optgroup = ComboboxListbox.Optgroup
Combobox.OptionSupplementaryInfo = ComboboxListbox.OptionAdditionalInfo
Combobox.Divider = ComboboxListbox.Divider

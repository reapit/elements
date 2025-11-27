import { ComboboxContext } from './context'
import { ComboboxListbox } from './listbox'
import { ComboboxPopup } from './combobox-popup'
import { ComboboxSearchInput } from './search-input'
import { ElCombobox } from './styles'
import { ComboboxSelectionChips } from './selection-chips'
import { Listbox } from '#src/utils/listbox'
import { useId } from 'react'

import type { HTMLAttributes } from 'react'

export namespace Combobox {
  export interface DividerProps extends ComboboxListbox.DividerProps {}
  export interface ListboxProps extends ComboboxListbox.Props {}
  export interface ListboxPlaceholderProps extends ComboboxListbox.PlaceholderProps {}
  export interface OptgroupProps extends ComboboxListbox.OptgroupProps {}
  export interface OptionProps extends ComboboxListbox.OptionProps {}
  export interface OptionAdditionalInfoProps extends ComboboxListbox.OptionAdditionalInfoProps {}
  export interface PopupProps extends ComboboxPopup.Props {}
  export interface SearchInputProps extends ComboboxSearchInput.Props {}
  export interface SelectionChipsProps extends ComboboxSelectionChips.Props {}

  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Combobox button, popup, and other child components */
    children?: React.ReactNode
    /** Whether the combobox is disabled */
    disabled?: boolean
    /** Maximum width of the combobox. Defaults to 100% */
    maxWidth?: string
    /** Whether the combobox supports multiple selections. */
    multiple?: boolean
    /** Whether a selection is required */
    required?: boolean
    /** Whether to show validation state styling */
    showValidity?: boolean
    /** Size of the combobox */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * A combobox is an input widget that has an associated popup. The popup enables users to choose
 * a value for the input from a collection.
 *
 * Provides context to descendant components for managing accessibility relationships and state.
 * Use with `Combobox.SelectButton` or `Combobox.AutocompleteButton`, `Combobox.Popup`,
 * `Combobox.SearchInput`, `Combobox.Listbox` et al to build a complete combobox pattern.
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
  multiple = false,
  required = false,
  showValidity = false,
  size = 'medium',
  style,
  ...rest
}: Combobox.Props) {
  const buttonId = useId()
  const listboxId = useId()
  const popupId = useId()

  return (
    <ComboboxContext.Provider value={{ buttonId, disabled, listboxId, multiple, popupId, required, size }}>
      <ElCombobox {...rest} data-show-validity={showValidity} style={{ '--combobox-max-width': maxWidth, ...style }}>
        {children}
      </ElCombobox>
    </ComboboxContext.Provider>
  )
}

Combobox.getOptionLabel = ComboboxListbox.getOptionLabel
Combobox.getListboxValue = Listbox.getValue

Combobox.Popup = ComboboxPopup
Combobox.SearchInput = ComboboxSearchInput

Combobox.Listbox = ComboboxListbox
Combobox.Optgroup = ComboboxListbox.Optgroup
Combobox.Option = ComboboxListbox.Option
Combobox.OptionAdditionalInfo = ComboboxListbox.OptionAdditionalInfo
Combobox.Divider = ComboboxListbox.Divider
Combobox.ListboxPlaceholder = ComboboxListbox.Placeholder

Combobox.SelectionChips = ComboboxSelectionChips

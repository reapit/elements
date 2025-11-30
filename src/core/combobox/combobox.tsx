import { ComboboxButton } from './button'
import { ComboboxContext, useComboboxContext } from './context'
import { ComboboxDefaultOptionsContext, useComboboxDefaultOptionsContext } from './default-options-context'
import { ComboboxListbox } from './listbox'
import { ComboboxPopup } from './combobox-popup'
import { ComboboxSearchInput } from './search-input'
import { ComboboxSelectedContent } from './selected-content'
import { ComboboxSelectionChips } from './selection-chips'
import { ElCombobox } from './styles'
import { getComboboxListboxId } from './get-listbox-id'
import { getComboboxPopupId } from './get-popup-id'
import { Listbox } from '#src/utils/listbox'
import { useComboboxButton } from './use-button'
import { useComboboxHasSelection } from './use-has-selection'
import { useComboboxSelectedOptions } from './use-selected-options'
import { useComboboxState } from './use-state'
import { useId } from 'react'

import type { HTMLAttributes } from 'react'

export namespace Combobox {
  export interface ButtonProps extends ComboboxButton.Props {}
  export interface ClearButtonProps extends ComboboxButton.ClearButtonProps {}
  export interface ContextValue extends ComboboxContext.Value {}
  export interface DefaultOptionsContextValue extends ComboboxDefaultOptionsContext.Value {}
  export interface DividerProps extends ComboboxListbox.DividerProps {}
  export interface ListboxProps extends ComboboxListbox.Props {}
  export interface ListboxPlaceholderProps extends ComboboxListbox.PlaceholderProps {}
  export interface OpenPopupButtonProps extends ComboboxButton.OpenPopupButtonProps {}
  export interface OptgroupProps extends ComboboxListbox.OptgroupProps {}
  export interface OptionProps extends ComboboxListbox.OptionProps {}
  export interface OptionAdditionalInfoProps extends ComboboxListbox.OptionAdditionalInfoProps {}
  export interface PopupProps extends ComboboxPopup.Props {}
  export interface SearchInputProps extends ComboboxSearchInput.Props {}
  export interface SelectedContentProps extends ComboboxSelectedContent.Props {}
  export interface SelectionChipsProps extends ComboboxSelectionChips.Props {}
  export interface SelectionChipsItemProps extends ComboboxSelectionChips.ItemProps {}

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
 * Use with `Combobox.Popup`, `Combobox.SearchInput`, `Combobox.Listbox` et al to build a
 * complete combobox pattern.
 *
 * @example
 * ```tsx
 * <Combobox required>
 *   <MyComboboxButton />
 *   <Combobox.Popup>
 *     <Combobox.Listbox>
 *       <Combobox.Option value="1">Option 1</Combobox.Option>
 *       <Combobox.Option value="2">Option 2</Combobox.Option>
 *     </Combobox.Listbox>
 *   </Combobox.Popup>
 * </Combobox>
 * ```
 */
export function Combobox({
  'aria-describedby': ariaDescribedBy,
  'aria-errormessage': ariaErrorMessage,
  'aria-invalid': ariaInvalid,
  children,
  disabled = false,
  id,
  maxWidth,
  multiple = false,
  required = false,
  showValidity = false,
  size = 'medium',
  style,
  ...rest
}: Combobox.Props) {
  const fallbackComboboxId = useId()
  const comboboxId = id ?? fallbackComboboxId
  const listboxId = getComboboxListboxId(comboboxId)
  const popupId = getComboboxPopupId(comboboxId)

  return (
    <ComboboxContext.Provider
      value={{
        ariaDescribedBy,
        ariaErrorMessage,
        ariaInvalid,
        comboboxId,
        disabled,
        listboxId,
        multiple,
        popupId,
        required,
        size,
      }}
    >
      <ElCombobox {...rest} data-show-validity={showValidity} style={{ '--combobox-max-width': maxWidth, ...style }}>
        {children}
      </ElCombobox>
    </ComboboxContext.Provider>
  )
}

Combobox.getOptionLabel = ComboboxListbox.getOptionLabel
Combobox.getListboxValue = Listbox.getValue
Combobox.getListboxId = getComboboxListboxId
Combobox.getPopupId = getComboboxPopupId

Combobox.Button = ComboboxButton
Combobox.ClearButton = ComboboxButton.ClearButton
Combobox.Divider = ComboboxListbox.Divider
Combobox.Listbox = ComboboxListbox
Combobox.ListboxPlaceholder = ComboboxListbox.Placeholder
Combobox.OpenPopupButton = ComboboxButton.OpenPopupButton
Combobox.Optgroup = ComboboxListbox.Optgroup
Combobox.Option = ComboboxListbox.Option
Combobox.OptionAdditionalInfo = ComboboxListbox.OptionAdditionalInfo
Combobox.Popup = ComboboxPopup
Combobox.SearchInput = ComboboxSearchInput
Combobox.SelectedContent = ComboboxSelectedContent
Combobox.SelectionChips = ComboboxSelectionChips
Combobox.SelectionChipsItem = ComboboxSelectionChips.Item

Combobox.Context = ComboboxContext
Combobox.DefaultOptionsContext = ComboboxDefaultOptionsContext
Combobox.useButton = useComboboxButton
Combobox.useContext = useComboboxContext
Combobox.useDefaultOptionsContext = useComboboxDefaultOptionsContext
Combobox.useHasSelection = useComboboxHasSelection
Combobox.useSelectedOptions = useComboboxSelectedOptions
Combobox.useState = useComboboxState

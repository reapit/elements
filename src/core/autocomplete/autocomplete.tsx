import { AutocompleteButton } from './autocomplete-button'
import { AutocompletePopup } from './autocomplete-popup'
import { Combobox } from '#src/core/combobox'

export namespace Autocomplete {
  export interface ButtonProps extends AutocompleteButton.Props {}
  export interface DefaultOptionsContextValue extends Combobox.DefaultOptionsContextValue {}
  export interface DividerProps extends Combobox.DividerProps {}
  export interface ListboxProps extends Combobox.Props {}
  export interface OptgroupProps extends Combobox.OptgroupProps {}
  export interface OptionProps extends Combobox.OptionProps {}
  export interface OptionAdditionalInfoProps extends Combobox.OptionAdditionalInfoProps {}
  export interface PlaceholderProps extends Combobox.ListboxPlaceholderProps {}
  export interface PopupProps extends Combobox.PopupProps {}
  export interface SearchInputProps extends Combobox.SearchInputProps {}
  export interface SelectionChipsProps extends Combobox.SelectionChipsProps {}
  export interface SelectionChipsItemProps extends Combobox.SelectionChipsItemProps {}

  export interface Props extends Combobox.Props {}
}

/**
 * Autocompletes allow users to search and select one or more items from a list. The list items can be
 * preloaded or fetched on demand.
 */
export function Autocomplete(props: Autocomplete.Props) {
  return <Combobox {...props} />
}

Autocomplete.getValue = Combobox.getListboxValue
Autocomplete.getListboxId = Combobox.getListboxId
Autocomplete.getPopupId = Combobox.getPopupId
Autocomplete.Button = AutocompleteButton
Autocomplete.Divider = Combobox.Divider
Autocomplete.DefaultOptionsContext = Combobox.DefaultOptionsContext
Autocomplete.Listbox = Combobox.Listbox
Autocomplete.Option = Combobox.Option
Autocomplete.OptionAdditionalInfo = Combobox.OptionAdditionalInfo
Autocomplete.Optgroup = Combobox.Optgroup
Autocomplete.Placeholder = Combobox.ListboxPlaceholder
Autocomplete.Popup = AutocompletePopup
Autocomplete.SearchInput = Combobox.SearchInput
Autocomplete.SelectionChips = Combobox.SelectionChips
Autocomplete.SelectionChipsItem = Combobox.SelectionChipsItem
Autocomplete.useState = Combobox.useState

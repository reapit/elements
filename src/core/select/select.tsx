import { SelectButton } from './select-button'
import { SelectPopup } from './select-popup'
import { Combobox } from '#src/core/combobox'

export namespace Select {
  export interface ButtonProps extends SelectButton.Props {}
  export interface DefaultOptionsContextValue extends Combobox.DefaultOptionsContextValue {}
  export interface DividerProps extends Combobox.DividerProps {}
  export interface ListboxProps extends Combobox.Props {}
  export interface OptgroupProps extends Combobox.OptgroupProps {}
  export interface OptionProps extends Combobox.OptionProps {}
  export interface OptionAdditionalInfoProps extends Combobox.OptionAdditionalInfoProps {}
  export interface PopupProps extends Combobox.PopupProps {}
  export interface SelectionChipsProps extends Combobox.SelectionChipsProps {}
  export interface SelectionChipsItemProps extends Combobox.SelectionChipsItemProps {}

  export interface Props extends Combobox.Props {}
}

/**
 * The select component allows users to pick one or more options from a preloaded list.
 */
export function Select(props: Select.Props) {
  return <Combobox {...props} />
}

Select.getValue = Combobox.getListboxValue
Select.getListboxId = Combobox.getListboxId
Select.getPopupId = Combobox.getPopupId
Select.Button = SelectButton
Select.DefaultOptionsContext = Combobox.DefaultOptionsContext
Select.Divider = Combobox.Divider
Select.Listbox = Combobox.Listbox
Select.Option = Combobox.Option
Select.OptionAdditionalInfo = Combobox.OptionAdditionalInfo
Select.Optgroup = Combobox.Optgroup
Select.Popup = SelectPopup
Select.SelectionChips = Combobox.SelectionChips
Select.SelectionChipsItem = Combobox.SelectionChipsItem
Select.useState = Combobox.useState

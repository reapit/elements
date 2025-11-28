import { SelectPopup } from './compact-select-popup'
import { Combobox } from '#src/core/combobox/combobox'
import { CompactSelectButton } from './compact-select-button'

import type { Combobox as ComboboxType } from '#src/core/combobox/combobox'

// We omit,
// - `multiple`, because compact selects only support single selection.
// - `required`, because compact selects do not support validation.
// - `showValidity`, because compact selects never visually communicate their validity.
type AttributesToOmit = Extract<keyof Combobox.Props, 'multiple' | 'required' | 'showValidity'>

export namespace CompactSelect {
  export interface ButtonProps extends React.ComponentProps<typeof CompactSelectButton> {}
  export interface DividerProps extends ComboboxType.DividerProps {}
  export interface ListboxProps extends ComboboxType.Props {}
  export interface OptgroupProps extends ComboboxType.OptgroupProps {}
  export interface OptionProps extends ComboboxType.OptionProps {}
  export interface OptionAdditionalInfoProps extends ComboboxType.OptionAdditionalInfoProps {}
  export interface PopupProps extends ComboboxType.PopupProps {}

  export interface Props extends Omit<ComboboxType.Props, AttributesToOmit> {}
}

/**
 * A space-saving version of a select with smaller padding and font size, used in dense layouts
 * or limited screen space.
 */
export function CompactSelect(props: CompactSelect.Props) {
  return <Combobox {...props} multiple={false} />
}

CompactSelect.getValue = Combobox.getListboxValue
CompactSelect.getListboxId = Combobox.getListboxId
CompactSelect.getPopupId = Combobox.getPopupId
CompactSelect.Button = CompactSelectButton
CompactSelect.Divider = Combobox.Divider
CompactSelect.Listbox = Combobox.Listbox
CompactSelect.Option = Combobox.Option
CompactSelect.OptionAdditionalInfo = Combobox.OptionAdditionalInfo
CompactSelect.Optgroup = Combobox.Optgroup
CompactSelect.Popup = SelectPopup
CompactSelect.useState = Combobox.useState

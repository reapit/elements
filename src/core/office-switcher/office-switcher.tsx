import { Combobox } from '#src/utils/combobox'
import { CompactSelect } from '#src/core/compact-select'
import { ElOfficeSwitcher } from './styles'
import { OfficeSwitcherListbox } from './office-switcher-listbox'
import { OfficeSwitcherPopup } from './office-switcher-popup'
import { OfficeSwitcherSelect } from './office-switcher-select'
import { OfficeSwitcherSelectOptgroup } from './office-switcher-select-optgroup'
import { OfficeSwitcherSelectOption } from './office-switcher-select-option'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace OfficeSwitcher {
  export interface ButtonProps extends CompactSelect.ButtonProps {}
  export interface DividerProps extends CompactSelect.DividerProps {}
  export interface ListboxProps extends OfficeSwitcherListbox.Props {}
  export interface OptgroupProps extends OfficeSwitcherSelectOptgroup.Props {}
  export interface OptionProps extends OfficeSwitcherSelectOption.Props {}
  export interface PopupProps extends OfficeSwitcherPopup.Props {}
  export interface SearchInputProps extends Combobox.SearchInputProps {}
  export interface SelectProps extends OfficeSwitcherSelect.Props {}

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The office switcher. Either plain text for single-office users or an `OfficeSwitcher.Select`. */
    children: ReactNode
  }
}

/**
 * Displays the current office or provides a way to switch between offices.
 *
 * For single-office users, the office name should be shown as static text.
 * For multi-office users, the available offices should be shown in the `OfficeSwitcher.Select`.
 */
export function OfficeSwitcher({ children, ...rest }: OfficeSwitcher.Props) {
  return <ElOfficeSwitcher {...rest}>{children}</ElOfficeSwitcher>
}

OfficeSwitcher.getValue = CompactSelect.getValue
OfficeSwitcher.getListboxId = CompactSelect.getListboxId
OfficeSwitcher.getPopupId = CompactSelect.getPopupId
OfficeSwitcher.Button = CompactSelect.Button
OfficeSwitcher.Divider = CompactSelect.Divider
OfficeSwitcher.Listbox = OfficeSwitcherListbox
OfficeSwitcher.Option = OfficeSwitcherSelectOption
OfficeSwitcher.Optgroup = OfficeSwitcherSelectOptgroup
OfficeSwitcher.Popup = OfficeSwitcherPopup
OfficeSwitcher.SearchInput = Combobox.SearchInput
OfficeSwitcher.Select = OfficeSwitcherSelect
OfficeSwitcher.useState = CompactSelect.useState

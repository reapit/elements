import { Combobox } from '#src/core/combobox'
import { CompactSelect } from '#src/core/compact-select'
import { ElOfficeSwitcher } from './styles'
import { OfficeSwitcherPopup } from './office-switcher-popup'

import type { HTMLAttributes, ReactNode } from 'react'
import { OfficeSwitcherSelect } from './office-switcher-select'

export namespace OfficeSwitcher {
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
OfficeSwitcher.Listbox = CompactSelect.Listbox
OfficeSwitcher.Option = CompactSelect.Option
OfficeSwitcher.Optgroup = CompactSelect.Optgroup
OfficeSwitcher.Popup = OfficeSwitcherPopup
OfficeSwitcher.SearchInput = Combobox.SearchInput
OfficeSwitcher.Select = OfficeSwitcherSelect
OfficeSwitcher.useState = CompactSelect.useState

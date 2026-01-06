import { Combobox } from '#src/core/combobox'
import { ReactNode } from 'react'

export namespace OfficeSwitcherPopup {
  export interface Props extends Combobox.PopupProps {
    /** Search input component for filtering options (typically CompactSelect.SearchInput). */
    search?: ReactNode
  }
}

const defaultMaxWidth = 'fit-content'

/**
 * OfficeSwitcher popups are used to display a list of offices.
 */
export function OfficeSwitcherPopup({
  closeOnSelection = 'auto',
  maxWidth = defaultMaxWidth,
  ...rest
}: OfficeSwitcherPopup.Props) {
  return <Combobox.Popup {...rest} closeOnSelection={closeOnSelection} maxWidth={maxWidth} />
}

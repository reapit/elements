import { Combobox } from '#src/core/combobox'

// We omit `preserveSearchOnClose` and `search` because Select's should never have a search input.
type AttributesToOmit = 'preserveSearchOnClose' | 'search'

export namespace CompactSelectPopup {
  export interface Props extends Omit<Combobox.PopupProps, AttributesToOmit> {}
}

const defaultMaxWidth = 'fit-content'

/**
 * Select popups are used to display a list of options.
 */
export function CompactSelectPopup({
  closeOnSelection = 'auto',
  maxWidth = defaultMaxWidth,
  ...rest
}: CompactSelectPopup.Props) {
  return <Combobox.Popup {...rest} closeOnSelection={closeOnSelection} maxWidth={maxWidth} />
}

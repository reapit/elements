import { Combobox } from "#src/utils/combobox";

// We omit `preserveSearchOnClose` and `search` because Select's should never have a search input.
type AttributesToOmit = "preserveSearchOnClose" | "search";

export namespace SelectPopup {
  export interface Props extends Omit<Combobox.PopupProps, AttributesToOmit> {}
}

/**
 * A popup that displays a list of selectable options.
 */
export function SelectPopup({ closeOnSelection = "auto", ...rest }: SelectPopup.Props) {
  return <Combobox.Popup {...rest} closeOnSelection={closeOnSelection} />;
}

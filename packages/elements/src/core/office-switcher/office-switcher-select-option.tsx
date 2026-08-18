import { Listbox } from "#src/utils/listbox";

import { OfficeItem } from "./office-item";

export namespace OfficeSwitcherSelectOption {
  export interface Props extends OfficeItem.Props, Listbox.OptionProps {}
}

/**
 * Integrates `OfficeItem` with the internal `<select>` element. Updates checked/selected state
 * automatically and renders as a native `<option>` when needed.
 */
export function OfficeSwitcherSelectOption(props: OfficeSwitcherSelectOption.Props) {
  return <Listbox.Option as={OfficeItem} {...props} />;
}

OfficeSwitcherSelectOption.displayName = "OfficeSwitcher.Option";

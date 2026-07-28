import { CompactSelect } from "#src/core/compact-select";

import { OfficeSwitcherPopup } from "./office-switcher-popup";

export namespace OfficeSwitcherSelect {
  export interface ButtonProps extends CompactSelect.ButtonProps {}
  export interface DividerProps extends CompactSelect.DividerProps {}
  export interface ListboxProps extends CompactSelect.Props {}
  export interface OptgroupProps extends CompactSelect.OptgroupProps {}
  export interface OptionProps extends CompactSelect.OptionProps {}
  export interface PopupProps extends OfficeSwitcherPopup.Props {}

  export interface Props extends CompactSelect.Props {}
}

/**
 * A compact select that allows users to switch between different offices.
 */
export function OfficeSwitcherSelect(props: OfficeSwitcherSelect.Props) {
  return <CompactSelect {...props} />;
}

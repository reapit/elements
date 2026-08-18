import type { Dispatch, SetStateAction } from "react";

import { Combobox } from "#src/utils/combobox/combobox";

import { CompactSelectButton } from "./compact-select-button";
import { CompactSelectPopup } from "./compact-select-popup";

// We omit,
// - `multiple`, because compact selects only support single selection.
// - `required`, because compact selects do not support validation.
// - `showValidity`, because compact selects never visually communicate their validity.
type AttributesToOmit = Extract<keyof Combobox.Props, "multiple" | "required" | "showValidity">;

export namespace CompactSelect {
  export interface ButtonProps extends CompactSelectButton.Props {}
  export interface DividerProps extends Combobox.DividerProps {}
  export interface ListboxProps extends Combobox.Props {}
  export interface OptgroupProps extends Combobox.OptgroupProps {}
  export interface OptionProps extends Combobox.OptionProps {}
  export interface OptionAdditionalInfoProps extends Combobox.OptionAdditionalInfoProps {}
  export interface PopupProps extends Combobox.PopupProps {}

  export interface Props extends Omit<Combobox.Props, AttributesToOmit> {}
}

/**
 * A space-saving version of a select with smaller padding and font size, used in dense layouts
 * or limited screen space.
 */
export function CompactSelect(props: CompactSelect.Props) {
  return <Combobox {...props} multiple={false} />;
}

CompactSelect.getValue = Combobox.getListboxValue;
CompactSelect.getListboxId = Combobox.getListboxId;
CompactSelect.getPopupId = Combobox.getPopupId;
CompactSelect.Button = CompactSelectButton;
CompactSelect.Divider = Combobox.Divider;
CompactSelect.Listbox = Combobox.Listbox;
CompactSelect.Option = Combobox.Option;
CompactSelect.OptionAdditionalInfo = Combobox.OptionAdditionalInfo;
CompactSelect.Optgroup = Combobox.Optgroup;
CompactSelect.Popup = CompactSelectPopup;
// Cast Combobox.useState to only accept string values because CompactSelect is always single-select.
CompactSelect.useState = Combobox.useState as (
  initialState: string | (() => string),
) => [string, Dispatch<SetStateAction<string>>];

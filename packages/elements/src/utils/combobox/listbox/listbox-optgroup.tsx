import { Listbox } from "#src/utils/listbox";

import { ComboboxOptgroup } from "../optgroup";

export namespace ComboboxListboxOptgroup {
  export interface Props extends Listbox.OptgroupProps {}
}

/**
 * Integrates `ComboboxOptgroup` with the internal `<select>` element, rendering as a native
 * `<optgroup>` when needed.
 */
export function ComboboxListboxOptgroup(props: ComboboxListboxOptgroup.Props) {
  return <Listbox.Optgroup as={ComboboxOptgroup} {...props} />;
}

ComboboxListboxOptgroup.displayName = "Combobox.Optgroup";

import { Combobox } from '#src/utils/combobox'

export namespace OfficeSwitcherListbox {
  export interface Props extends Omit<Combobox.ListboxProps, 'role'> {}
}

/**
 * The listbox for `OfficeSwitcherSelect`. Always renders with `role="tree"` so that
 * office groups (via `<details>/<summary>`) and items use the correct ARIA tree widget
 * pattern.
 */
export function OfficeSwitcherListbox(props: OfficeSwitcherListbox.Props) {
  return <Combobox.Listbox {...props} role="tree" />
}

OfficeSwitcherListbox.displayName = 'OfficeSwitcher.Listbox'

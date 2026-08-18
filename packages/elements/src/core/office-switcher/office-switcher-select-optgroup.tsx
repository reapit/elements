import type { ReactNode } from "react";

import { Listbox } from "#src/utils/listbox";

import { OfficeSwitcherOfficeGroup } from "./office-group";

export namespace OfficeSwitcherSelectOptgroup {
  export interface Props extends Listbox.OptgroupProps {
    /**
     * The office items to display within the group. Typically a collection of
     * `OfficeSwitcher.Option` components.
     */
    children?: ReactNode;
    /**
     * Indicates whether the group is open/expanded.
     */
    open?: boolean;
  }
}

/**
 * Integrates `OfficeSwitcherOfficeGroup` with the internal `<select>` element. Provides a
 * collapsible group of office options and renders as a native `<optgroup>` when needed.
 */
export function OfficeSwitcherSelectOptgroup(props: OfficeSwitcherSelectOptgroup.Props) {
  return <Listbox.Optgroup as={OfficeSwitcherOfficeGroup} {...props} />;
}

OfficeSwitcherSelectOptgroup.displayName = "OfficeSwitcher.Optgroup";

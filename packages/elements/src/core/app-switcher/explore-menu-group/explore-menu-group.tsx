import type { ReactNode } from "react";

import { Menu } from "#src/core/menu";

import { AppSwitcherMenuGroupHasAccessContext } from "../menu-group-has-access-context";

export namespace AppSwitcherExploreMenuGroup {
  export interface Props {
    children: ReactNode;
  }
}

export function AppSwitcherExploreMenuGroup({ children }: AppSwitcherExploreMenuGroup.Props) {
  return (
    <Menu.Group label={"EXPLORE"}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={false}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  );
}

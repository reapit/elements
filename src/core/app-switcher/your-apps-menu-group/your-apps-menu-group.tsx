import type { ReactNode } from "react";

import { Menu } from "#src/core/menu";

import { AppSwitcherMenuGroupHasAccessContext } from "../menu-group-has-access-context";

export namespace AppSwitcherYourAppsMenuGroup {
  export interface Props {
    children: ReactNode;
  }
}

export function AppSwitcherYourAppsMenuGroup({ children }: AppSwitcherYourAppsMenuGroup.Props) {
  return (
    <Menu.Group label={"YOUR APPS"}>
      <AppSwitcherMenuGroupHasAccessContext.Provider value={true}>
        {children}
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    </Menu.Group>
  );
}

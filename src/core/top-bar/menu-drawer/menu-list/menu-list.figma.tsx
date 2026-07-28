import figma from "@figma/code-connect";

import { TopBar } from "../../top-bar";

figma.connect(TopBar, "<TOP_BAR_MENU_LIST_URL>", {
  props: {
    children: figma.children("*"),
  },
  example: (props) => (
    <TopBar.MenuList>
      {/* NOTE: consider using TopBar.MenuMainNav, TopBar.MenuSecondaryNav or TopBar.MenuProfileNav instead */}
      {props.children}
    </TopBar.MenuList>
  ),
});

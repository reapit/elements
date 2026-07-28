import figma from "@figma/code-connect";

import { TopBar } from "../../top-bar";

figma.connect(TopBar, "<TOP_BAR_MENU_SUBMENU_URL>", {
  props: {
    children: figma.children("*"),
  },
  example: (props) => <TopBar.MenuSubmenu>{props.children}</TopBar.MenuSubmenu>,
});

// url=<TOP_BAR_MENU_SUBMENU_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "TopBar",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.MenuSubmenu>${figma.helpers.react.renderChildren(
    children,
  )}</TopBar.MenuSubmenu>`,
  metadata: { nestable: true },
};

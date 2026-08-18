// url=<TOP_BAR_MAIN_NAV_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.MainNav

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "TopBar.MainNav",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.MainNav>${figma.helpers.react.renderChildren(
    children,
  )}</TopBar.MainNav>`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35251&m=dev
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

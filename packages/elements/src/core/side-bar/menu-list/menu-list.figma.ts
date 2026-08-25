// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35460&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/side-bar/side-bar.tsx
// component=SideBar.MenuList

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "SideBar.MenuList",
  imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
  example: figma.code`<SideBar.MenuList>${figma.helpers.react.renderChildren(
    children,
  )}</SideBar.MenuList>`,
  metadata: { nestable: true },
};

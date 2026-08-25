// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35396&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/side-bar/side-bar.tsx
// component=SideBar.Submenu

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "SideBar.Submenu",
  imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
  example: figma.code`<SideBar.Submenu>${figma.helpers.react.renderChildren(
    children,
  )}</SideBar.Submenu>`,
  metadata: { nestable: true },
};

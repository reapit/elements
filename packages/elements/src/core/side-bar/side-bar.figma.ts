// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35522&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/side-bar/side-bar.tsx
// component=SideBar

import figma from "figma";

const menuList = figma.properties.children(["Menu list"]);
const collapseButton = figma.properties.children(["Collapse button"]);

export default {
  id: "SideBar",
  imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
  example: figma.code`<SideBar${figma.helpers.react.renderProp(
    "footer",
    collapseButton,
  )}>${figma.helpers.react.renderChildren(menuList)}</SideBar>`,
  metadata: { nestable: true },
};

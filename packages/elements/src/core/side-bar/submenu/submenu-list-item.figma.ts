// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35359&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/side-bar/side-bar.tsx
// component=SideBar.SubmenuItem

import figma from "figma";

const ariaCurrent = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Hover: false,
  Select: "page",
});
const children = figma.selectedInstance.getString("Label");

export default {
  id: "SideBar.SubmenuItem",
  imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
  example: figma.code`<SideBar.SubmenuItem${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )} href="#replace-me">
      ${figma.helpers.react.renderChildren(children)}
    </SideBar.SubmenuItem>`,
  metadata: { nestable: true },
};

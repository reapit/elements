// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-34950&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.NavItem

import figma from "figma";

const ariaCurrent = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Hover: false,
  Select: "page",
});
const label = figma.selectedInstance.getString("Label");

export default {
  id: "TopBar.NavItem",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.NavItem${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )} href="#replace-me">
      ${figma.helpers.react.renderChildren(label)}
    </TopBar.NavItem>`,
  metadata: { nestable: true },
};

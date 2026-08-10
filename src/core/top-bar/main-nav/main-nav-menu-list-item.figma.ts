// url=<TOP_BAR_NAV_DROPDOWN_BUTTON_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.NavMenuItem

import figma from "figma";

const ariaCurrent = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Hover: false,
  Select: "page",
});
const label = figma.selectedInstance.findText("Label").__render__();

export default {
  id: "TopBar.NavMenuItem",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.NavMenuItem${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )}${figma.helpers.react.renderProp("label", label)}>
      TODO: Add menu items
    </TopBar.NavMenuItem>`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-34935&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.NavIconItem

import figma from "figma";

const ariaCurrent = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Hover: false,
  Select: "page",
});
const tooltip = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance("Tooltip");
  return {
    description: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Description") : undefined,
  };
})();
const hasBadge = figma.selectedInstance.getBoolean("Badge");
const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;

export default {
  id: "TopBar.NavIconItem",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.NavIconItem${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )}${figma.helpers.react.renderProp(
    "aria-label",
    tooltip.description,
  )}${figma.helpers.react.renderProp(
    "hasBadge",
    hasBadge,
  )} href="#replace-me"${figma.helpers.react.renderProp("icon", icon)}/>`,
  metadata: { nestable: true },
};

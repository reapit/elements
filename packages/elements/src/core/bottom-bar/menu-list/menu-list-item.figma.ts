// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-34925&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/bottom-bar/bottom-bar.tsx
// component=BottomBar.MenuItem

import figma from "figma";

const children = figma.selectedInstance.getString("Label");
const hasBadge = figma.selectedInstance.getBoolean("Badge");
const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;

export default {
  id: "BottomBar.MenuItem",
  imports: ['import { BottomBar } from "@reapit/elements/core/bottom-bar";'],
  example: figma.code`<BottomBar.Item aria-current={false}${figma.helpers.react.renderProp(
    "hasBadge",
    hasBadge,
  )} href="#replace-me"${figma.helpers.react.renderProp("icon", icon)}>
      ${figma.helpers.react.renderChildren(children)}
    </BottomBar.Item>`,
  metadata: { nestable: true },
};

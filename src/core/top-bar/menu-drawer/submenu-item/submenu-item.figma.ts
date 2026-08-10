// url=<TOP_BAR_MENU_SUBMENU_ITEM_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar

import figma from "figma";

const hasBadge = figma.selectedInstance.getBoolean("Notification badge");
const label = figma.selectedInstance.getString("Label");

export default {
  id: "TopBar",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.MenuSubmenuItem aria-current={false}${figma.helpers.react.renderProp(
    "hasBadge",
    hasBadge,
  )} href="<REPLACE_ME>">
      ${figma.helpers.react.renderChildren(label)}
    </TopBar.MenuSubmenuItem>`,
  metadata: { nestable: true },
};

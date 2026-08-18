// url=<MENU_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/menu/menu.tsx
// component=Menu.Group

import figma from "figma";

const children = figma.properties.children(["Menu item"]);
const label = figma.selectedInstance.getString("Group title");

export default {
  id: "Menu.Group",
  imports: ['import { Menu } from "@reapit/elements/core/menu";'],
  example: figma.code`<Menu.Group${figma.helpers.react.renderProp(
    "label",
    label,
  )}>${figma.helpers.react.renderChildren(children)}</Menu.Group>`,
  metadata: { nestable: true },
};

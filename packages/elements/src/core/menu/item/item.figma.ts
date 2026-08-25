// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9952-3123&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/menu/menu.tsx
// component=Menu.Item

import figma from "figma";

const badge = figma.properties.children(["Badge"]);
const children = figma.selectedInstance.getString("Item label");
const iconLeft = figma.selectedInstance.getInstanceSwap("Icon L")?.executeTemplate().example;
const iconRight = figma.selectedInstance.getInstanceSwap("Icon R")?.executeTemplate().example;
const supplementaryInfo = figma.selectedInstance.getString("Supplementary info");

export default {
  id: "Menu.Item",
  imports: ['import { Menu } from "@reapit/elements/core/menu";'],
  example: figma.code`<Menu.Item${figma.helpers.react.renderProp(
    "badge",
    badge,
  )}${figma.helpers.react.renderProp("iconLeft", iconLeft)}${figma.helpers.react.renderProp(
    "iconRight",
    iconRight,
  )}${figma.helpers.react.renderProp("supplementaryInfo", supplementaryInfo)}>
      ${figma.helpers.react.renderChildren(children)}
    </Menu.Item>`,
  metadata: { nestable: true },
};

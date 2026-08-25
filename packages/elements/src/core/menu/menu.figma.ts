// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9952-3115&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/menu/menu.tsx
// component=Menu

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "Menu",
  imports: ['import { Menu } from "@reapit/elements/core/menu";'],
  example: figma.code`<Menu aria-labelledby="trigger-id" id="menu-id" placement="top">
      ${figma.helpers.react.renderChildren(children)}
    </Menu>`,
  metadata: { nestable: true },
};

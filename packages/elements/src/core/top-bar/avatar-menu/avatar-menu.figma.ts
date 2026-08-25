// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-34995&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.AvatarMenu

import figma from "figma";

const children = figma.selectedInstance.getString("Initials");

export default {
  id: "TopBar.AvatarMenu",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.AvatarMenu${figma.helpers.react.renderProp(
    "initials",
    children,
  )}>TODO: add menu items</TopBar.AvatarMenu>`,
  metadata: { nestable: true },
};

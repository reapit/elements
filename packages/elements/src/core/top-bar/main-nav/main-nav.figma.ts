// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12255-8601&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.MainNav

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "TopBar.MainNav",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.MainNav>${figma.helpers.react.renderChildren(
    children,
  )}</TopBar.MainNav>`,
  metadata: { nestable: true },
};

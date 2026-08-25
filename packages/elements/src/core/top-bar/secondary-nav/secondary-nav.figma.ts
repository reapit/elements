// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35003&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.SecondaryNav

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "TopBar.SecondaryNav",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.SecondaryNav>${figma.helpers.react.renderChildren(
    children,
  )}</TopBar.SecondaryNav>`,
  metadata: { nestable: true },
};

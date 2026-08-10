// url=<AT_A_GLANCE_URL_DEPRECATED>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "AtAGlance",
  imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
  example: figma.code`<AtAGlance.Listbox>${figma.helpers.react.renderChildren(
    children,
  )}</AtAGlance.Listbox>`,
  metadata: { nestable: true },
};

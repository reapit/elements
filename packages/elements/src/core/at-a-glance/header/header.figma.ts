// url=<AT_A_GLANCE_HEADER_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance.Header

import figma from "figma";

const accessory = figma.selectedInstance.getBoolean("Show accessory", {
  true: figma.selectedInstance.getInstanceSwap("Accessory")?.executeTemplate().example,
  false: undefined,
});
const children = figma.selectedInstance.getString("Title");

export default {
  id: "AtAGlance.Header",
  imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
  example: figma.code`<AtAGlance.Header${figma.helpers.react.renderProp(
    "accessory",
    accessory,
  )}>${figma.helpers.react.renderChildren(children)}</AtAGlance.Header>`,
  metadata: { nestable: true },
};

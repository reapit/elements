// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=11095-10396&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/divider/divider.tsx
// component=Divider

import figma from "figma";

const ariaOrientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});
const variant = figma.selectedInstance.getEnum("Style", {
  Solid: "solid",
  Dashed: "dashed",
});

export default {
  id: "Divider",
  imports: ['import { Divider } from "@reapit/elements/core/divider";'],
  example: figma.code`<Divider${figma.helpers.react.renderProp(
    "aria-orientation",
    ariaOrientation,
  )}${figma.helpers.react.renderProp("variant", variant)}/>`,
  metadata: { nestable: true },
};

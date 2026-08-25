// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=2355-9645&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/features/features.tsx
// component=Features

import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  "2xs": "2xs",
  xs: "xs",
  sm: "sm",
  base: "base",
});
const children = figma.properties.children(["*"]);

export default {
  id: "Features",
  imports: ['import { Features } from "@reapit/elements/core/features";'],
  example: figma.code`<Features${figma.helpers.react.renderProp("size", size)}>
      {/* NOTE: Use Features.Bathrooms, Features.Bedrooms, Features.CarSpaces
     * or Features.LandSize for common feature items */}
      ${figma.helpers.react.renderChildren(children)}
    </Features>`,
  metadata: { nestable: true },
};

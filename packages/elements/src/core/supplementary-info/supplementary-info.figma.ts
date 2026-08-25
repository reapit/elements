// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=11918-14145&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/supplementary-info/supplementary-info.tsx
// component=SupplementaryInfo

import figma from "figma";

const children = figma.properties.children(["Supp text *"]);
const size = figma.selectedInstance.getEnum("Size", {
  base: "base",
  sm: "sm",
  xs: "xs",
});

export default {
  id: "SupplementaryInfo",
  imports: ['import { SupplementaryInfo } from "@reapit/elements/core/supplementary-info";'],
  example: figma.code`<SupplementaryInfo${figma.helpers.react.renderProp(
    "size",
    size,
  )}>${figma.helpers.react.renderChildren(children)}</SupplementaryInfo>`,
  metadata: { nestable: true },
};

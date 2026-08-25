// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=11918-14088&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/supplementary-info/supplementary-info.tsx
// component=SupplementaryInfo.Item

import figma from "figma";

const children = figma.selectedInstance.findText("Value").__render__();
const colour = figma.selectedInstance.getEnum("Style", {
  Primary: "primary",
  Secondary: "secondary",
  Neutral: "neutral",
  Success: "success",
  Pending: "pending",
  Warning: "warning",
  Danger: "danger",
  "Accent 1": "accent_1",
  "Accent 2": "accent_2",
});

export default {
  id: "SupplementaryInfo.Item",
  imports: ['import { SupplementaryInfo } from "@reapit/elements/core/supplementary-info";'],
  example: figma.code`<SupplementaryInfo.Item${figma.helpers.react.renderProp(
    "colour",
    colour,
  )}>${figma.helpers.react.renderChildren(children)}</SupplementaryInfo.Item>`,
  metadata: { nestable: true },
};

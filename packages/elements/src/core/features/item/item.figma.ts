// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12955-37788&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/features/features.tsx
// component=Features.Item

import figma from "figma";

const icon = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;
const value = figma.selectedInstance.getString("Value");

export default {
  id: "Features.Item",
  imports: ['import { Features } from "@reapit/elements/core/features";'],
  example: figma.code`<Features.Item${figma.helpers.react.renderProp(
    "icon",
    icon,
  )} label="replace me"${figma.helpers.react.renderProp("value", value)}/>`,
  metadata: { nestable: true },
};

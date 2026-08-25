// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=5722-7495&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/status-indicator/status-indicator.tsx
// component=StatusIndicator

import figma from "figma";

const children = figma.selectedInstance.getString("Label");
const variant = figma.selectedInstance.getEnum("Style", {
  Neutral: "neutral",
  Success: "success",
  Pending: "pending",
  Warning: "warning",
  Danger: "danger",
  Inactive: "inactive",
  "Accent 1": "accent_1",
  "Accent 2": "accent_2",
});

export default {
  id: "StatusIndicator",
  imports: ['import { StatusIndicator } from "@reapit/elements/core/status-indicator";'],
  example: figma.code`<StatusIndicator${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}>${figma.helpers.react.renderChildren(children)}</StatusIndicator>`,
  metadata: { nestable: true },
};

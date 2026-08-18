// url=<TOAST_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/toast/toast.tsx
// component=Toast

import figma from "figma";

const icon = figma.selectedInstance.getEnum("Variant", {
  Success: undefined,
  Error: undefined,
  Warning: undefined,
  Info: undefined,
  Neutral: figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example,
});
const message = figma.selectedInstance.getString("Message");
const variant = figma.selectedInstance.getEnum("Variant", {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
  Neutral: "neutral",
});

export default {
  id: "Toast",
  imports: ['import { Toast } from "@reapit/elements/core/toast";'],
  example: figma.code`// NOTE: Use \`toast\` from \`@reapit/elements/core/toaster\` to imperatively show toasts. This \`Toast\`
// component is presentational only and will render within the document flow. See the \`Toaster\`
// component for more details.
//
// Also, duration should be 4s for single-line messages, and 6s for multi-line messages.
<Toast duration={4000}${figma.helpers.react.renderProp(
    "icon",
    icon,
  )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(message)}
    </Toast>`,
  metadata: { nestable: true },
};

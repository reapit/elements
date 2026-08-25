// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20266-44550&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/alert-banner/alert-banner.tsx
// component=AlertBanner

import figma from "figma";

const actions = figma.selectedInstance.getBoolean("Show actions", {
  true: figma.properties.children(["Button group"]),
  false: undefined,
});
const children = figma.selectedInstance.getString("Description");
const icon = figma.selectedInstance.getBoolean("Show icon", {
  true: figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example,
  false: undefined,
});
const onDismiss = figma.selectedInstance.getBoolean("Dismissible", {
  true: figma.helpers.react.function("() => void 0"),
  false: undefined,
});
const variant = figma.selectedInstance.getEnum("Variant", {
  Warning: "warning",
  Info: "info",
  Error: "error",
});

export default {
  id: "AlertBanner",
  imports: ['import { AlertBanner } from "@reapit/elements/core/alert-banner";'],
  example: figma.code`<AlertBanner${figma.helpers.react.renderProp(
    "actions",
    actions,
  )}${figma.helpers.react.renderProp("icon", icon)}${figma.helpers.react.renderProp(
    "onDismiss",
    onDismiss,
  )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(children)}
    </AlertBanner>`,
  metadata: { nestable: true },
};

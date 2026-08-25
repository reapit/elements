// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20266-49959&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/section-message/section-message.tsx
// component=SectionMessage

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
  true: figma.helpers.react.function("() => {\n        // TOOD: Handle dismiss\n      }"),
  false: undefined,
});
const title = figma.selectedInstance.getString("Title");
const variant = figma.selectedInstance.getEnum("Variant", {
  Error: "error",
  Warning: "warning",
  Info: "info",
  Success: "success",
  "Neutral light": "neutral-light",
  "Neutral dark": "neutral-dark",
});

export default {
  id: "SectionMessage",
  imports: ['import { SectionMessage } from "@reapit/elements/core/section-message";'],
  example: figma.code`<SectionMessage${figma.helpers.react.renderProp(
    "actions",
    actions,
  )}${figma.helpers.react.renderProp("icon", icon)}${figma.helpers.react.renderProp(
    "onDismiss",
    onDismiss,
  )}${figma.helpers.react.renderProp(
    "title",
    title,
  )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(children)}
    </SectionMessage>`,
  metadata: { nestable: true },
};

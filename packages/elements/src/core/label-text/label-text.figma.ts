// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9123-8014&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/label-text/label-text.tsx
// component=LabelText

import figma from "figma";

const children = figma.selectedInstance.getString("Label text");
const isRequired = figma.selectedInstance.getBoolean("Required");
const size = figma.selectedInstance.getEnum("Size", {
  xs: "xs",
  sm: "sm",
});
const variant = figma.selectedInstance.getEnum("Variant", {
  Soft: "soft",
  Strong: "strong",
});

export default {
  id: "LabelText",
  imports: ['import { LabelText } from "@reapit/elements/core/label-text";'],
  example: figma.code`<LabelText${figma.helpers.react.renderProp(
    "isRequired",
    isRequired,
  )}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(children)}
    </LabelText>`,
  metadata: { nestable: true },
};

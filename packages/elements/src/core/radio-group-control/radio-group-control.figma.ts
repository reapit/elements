// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9723-14725&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/radio-group-control/radio-group-control.tsx
// component=RadioGroupControl

import figma from "figma";

const children = figma.properties.children(["Radio *"]);
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error message"),
});
const label = figma.selectedInstance.getBoolean("Show group label", {
  true: (function () {
    const nestedLayer33 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer33.type !== "ERROR" ? nestedLayer33.getString("Label text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  id: "RadioGroupControl",
  imports: ['import { RadioGroupControl } from "@reapit/elements/core/radio-group-control";'],
  example: figma.code`<RadioGroupControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )}${figma.helpers.react.renderProp("orientation", orientation)}>
      ${figma.helpers.react.renderChildren(children)}
    </RadioGroupControl>`,
  metadata: { nestable: true },
};

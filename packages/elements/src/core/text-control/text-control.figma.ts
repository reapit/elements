// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9137-10636&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/text-control/text-control.tsx
// component=TextControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error message"),
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: figma.selectedInstance.getString("Helper text"),
  false: undefined,
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer7 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer7.type !== "ERROR" ? nestedLayer7.getString("Label text") : undefined,
      required: nestedLayer7.type !== "ERROR" ? nestedLayer7.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const placeholder = figma.selectedInstance.getString("Placeholder text");
const showValidity = figma.selectedInstance.getEnum("State", {
  Error: true,
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  id: "TextControl",
  imports: ['import { TextControl } from "@reapit/elements/core/text-control";'],
  example: figma.code`<TextControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "helpText",
    helpText,
  )}${figma.helpers.react.renderProp("label", label.text)}${figma.helpers.react.renderProp(
    "placeholder",
    placeholder,
  )}${figma.helpers.react.renderProp("required", label.required)}${figma.helpers.react.renderProp(
    "showValidity",
    showValidity,
  )}${figma.helpers.react.renderProp("size", size)}/>`,
  metadata: { nestable: true },
};

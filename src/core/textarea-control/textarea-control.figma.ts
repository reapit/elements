// url=<TEXTAREA_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/textarea-control/textarea-control.tsx
// component=TextareaControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error text"),
});
const fieldSizing = figma.selectedInstance.getBoolean("Dynamic height", {
  true: "fixed",
  false: "content",
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: figma.selectedInstance.getString("Helper text"),
  false: undefined,
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer6 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer6.type !== "ERROR" ? nestedLayer6.getString("Label text") : undefined,
      required: nestedLayer6.type !== "ERROR" ? nestedLayer6.getBoolean("Required") : undefined,
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
  id: "TextareaControl",
  imports: ['import { TextareaControl } from "@reapit/elements/core/textarea-control";'],
  example: figma.code`<TextareaControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "fieldSizing",
    fieldSizing,
  )}${figma.helpers.react.renderProp("helpText", helpText)}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )}${figma.helpers.react.renderProp("placeholder", placeholder)}${figma.helpers.react.renderProp(
    "required",
    label.required,
  )}${figma.helpers.react.renderProp(
    "showValidity",
    showValidity,
  )}${figma.helpers.react.renderProp("size", size)}/>`,
  metadata: { nestable: true },
};

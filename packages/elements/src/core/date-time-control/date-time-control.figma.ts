// url=<DATE_TIME_INPUT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/date-time-control/date-time-control.tsx
// component=DateTimeControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error text"),
});
const helpText = figma.selectedInstance.getBoolean("Show helper", {
  true: figma.selectedInstance.getString("Helper text"),
  false: undefined,
});
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer57 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer57.type !== "ERROR" ? nestedLayer57.getString("Label text") : undefined,
      required: nestedLayer57.type !== "ERROR" ? nestedLayer57.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const showValidity = figma.selectedInstance.getEnum("State", {
  Error: true,
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  id: "DateTimeControl",
  imports: ['import { DateTimeControl } from "@reapit/elements/core/date-time-control";'],
  example: figma.code`<DateTimeControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "helpText",
    helpText,
  )}${figma.helpers.react.renderProp("label", label.text)}${figma.helpers.react.renderProp(
    "required",
    label.required,
  )}${figma.helpers.react.renderProp(
    "showValidity",
    showValidity,
  )}${figma.helpers.react.renderProp("size", size)}/>`,
  metadata: { nestable: true },
};

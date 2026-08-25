// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12404-18248&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/select-native-control/select-native-control.tsx
// component=SelectNativeControl

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
    const nestedLayer26 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer26.type !== "ERROR" ? nestedLayer26.getString("Label text") : undefined,
      required: nestedLayer26.type !== "ERROR" ? nestedLayer26.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const selectionLabel = figma.selectedInstance.getString("Selection label");
const showValidity = figma.selectedInstance.getEnum("State", {
  Error: true,
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  id: "SelectNativeControl",
  imports: ['import { SelectNativeControl } from "@reapit/elements/core/select-native-control";'],
  example: figma.code`<SelectNativeControl${figma.helpers.react.renderProp(
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
  )}${figma.helpers.react.renderProp("size", size)}>
      <option value="">${figma.helpers.react.renderChildren(selectionLabel)}</option>
      {/* TODO: add remaining options */}
    </SelectNativeControl>`,
  metadata: { nestable: true },
};

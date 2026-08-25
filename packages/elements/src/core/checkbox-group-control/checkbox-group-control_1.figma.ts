// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9723-9759&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/checkbox-group-control/checkbox-group-control.tsx
// component=CheckboxGroupControl

import figma from "figma";

const children = figma.properties.children(["Checkbox *"]);
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error message"),
});
const label = figma.selectedInstance.getBoolean("Show group label", {
  true: (function () {
    const nestedLayer61 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer61.type !== "ERROR" ? nestedLayer61.getString("Label text") : undefined,
    };
  })(),
  false: { text: undefined },
});
const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  id: "CheckboxGroupControl",
  imports: ['import { CheckboxGroupControl } from "@reapit/elements/core/checkbox-group-control";'],
  example: figma.code`<CheckboxGroupControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "label",
    label.text,
  )}${figma.helpers.react.renderProp("orientation", orientation)}>
      {/* NOTE: use CheckboxGroupControl.Option instead of CheckboxGroupControl */}
      ${figma.helpers.react.renderChildren(children)}
    </CheckboxGroupControl>`,
  metadata: { nestable: true },
};

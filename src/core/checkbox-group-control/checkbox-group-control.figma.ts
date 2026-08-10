// url=<CHECKBOX_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/checkbox-group-control/checkbox-group-control.tsx
// component=CheckboxGroupControl

import figma from "figma";

const children = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: (function () {
    const slot = figma.properties.slot("Horizontal content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
  Vertical: (function () {
    const slot = figma.properties.slot("Vertical content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
});
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error message"),
});
const label = figma.selectedInstance.getBoolean("Show group label", {
  true: (function () {
    const nestedLayer60 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer60.type !== "ERROR" ? nestedLayer60.getString("Label text") : undefined,
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

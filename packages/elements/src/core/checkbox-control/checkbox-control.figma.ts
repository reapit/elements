// url=<CHECKBOX_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/checkbox-control/checkbox-control.tsx
// component=CheckboxControl

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const errorText = figma.selectedInstance.getEnum("State", {
  Error: figma.selectedInstance.getString("Error message"),
});
const isIndeterminate = figma.selectedInstance.getEnum("Indeterminate", {
  True: true,
  False: false,
});
const label = figma.selectedInstance.getString("Label");
const supplementaryInfo = figma.selectedInstance.getBoolean("Show supplementary info", {
  true: figma.selectedInstance.getString("Supplementary info"),
  false: undefined,
});

export default {
  id: "CheckboxControl",
  imports: ['import { CheckboxControl } from "@reapit/elements/core/checkbox-control";'],
  example: figma.code`<CheckboxControl${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("errorText", errorText)}${figma.helpers.react.renderProp(
    "isIndeterminate",
    isIndeterminate,
  )}${figma.helpers.react.renderProp("label", label)}${figma.helpers.react.renderProp(
    "supplementaryInfo",
    supplementaryInfo,
  )}/>`,
  metadata: { nestable: true },
};

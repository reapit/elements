// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=9723-14674&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/radio-group-control/radio-group-control.tsx
// component=RadioGroupControl.Option

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const label = figma.selectedInstance.getString("Label");
const supplementaryInfo = figma.selectedInstance.getBoolean("Show supplementary info", {
  true: figma.selectedInstance.getString("Supplementary info"),
  false: undefined,
});

export default {
  id: "RadioGroupControl.Option",
  imports: ['import { RadioGroupControl } from "@reapit/elements/core/radio-group-control";'],
  example: figma.code`<RadioGroupControl.Option${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("label", label)}${figma.helpers.react.renderProp(
    "supplementaryInfo",
    supplementaryInfo,
  )}/>`,
  metadata: { nestable: true },
};

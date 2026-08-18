// url=<SWITCH_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/switch/switch.tsx
// component=Switch

import figma from "figma";

const ariaLabel = figma.selectedInstance.getEnum("Label", {
  "No label": "<CHANGE ME>",
  Start: undefined,
  End: undefined,
});
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const label = figma.selectedInstance.getEnum("Label", {
  "No label": undefined,
  Start: figma.selectedInstance.getString("Label text"),
  End: figma.selectedInstance.getString("Label text"),
});
const labelPlacement = figma.selectedInstance.getEnum("Label", {
  "No label": undefined,
  Start: "start",
  End: "end",
});

export default {
  id: "Switch",
  imports: ['import { Switch } from "@reapit/elements/core/switch";'],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    "aria-label",
    ariaLabel,
  )}${figma.helpers.react.renderProp("disabled", disabled)}${figma.helpers.react.renderProp(
    "label",
    label,
  )}${figma.helpers.react.renderProp("labelPlacement", labelPlacement)}/>`,
  metadata: { nestable: true },
};

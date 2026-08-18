// url=<SPLIT_BUTTON_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/split-button/split-button.tsx
// component=SplitButton

import figma from "figma";

const action = figma.properties.children(["Main action button"]);
const menu = figma.properties.children(["Dropdown menu button"]);
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const variant = figma.selectedInstance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
});

export default {
  id: "SplitButton",
  imports: ['import { SplitButton } from "@reapit/elements/core/split-button";'],
  example: figma.code`<SplitButton${figma.helpers.react.renderProp(
    "action",
    action,
  )}${figma.helpers.react.renderProp("menu", menu)}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("variant", variant)}/>`,
  metadata: { nestable: true },
};

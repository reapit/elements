// url=<CHIP_SELECT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/chip-select-control/chip-select-control.tsx
// component=ChipSelectControl

import figma from "figma";

const children = figma.properties.children(["Chip*"]);
const label = figma.selectedInstance.getBoolean("Show label", {
  true: (function () {
    const nestedLayer58 = figma.selectedInstance.findInstance("LabelText");
    return {
      text: nestedLayer58.type !== "ERROR" ? nestedLayer58.getString("Label text") : undefined,
      required: nestedLayer58.type !== "ERROR" ? nestedLayer58.getBoolean("Required") : undefined,
    };
  })(),
  false: { text: undefined, required: undefined },
});
const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  id: "ChipSelectControl",
  imports: ['import { ChipSelectControl } from "@reapit/elements/core/chip-select-control";'],
  example: figma.code`<ChipSelectControl${figma.helpers.react.renderProp(
    "label",
    label.text,
  )} name="change-me"${figma.helpers.react.renderProp(
    "required",
    label.required,
  )}${figma.helpers.react.renderProp("size", size)}>
      {/* NOTE: Use ChipSelectControl.Option instead of ChipSelect.Option */}
      ${figma.helpers.react.renderChildren(children)}
    </ChipSelectControl>`,
  metadata: { nestable: true },
};

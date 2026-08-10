// url=<CHIP_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/chip-group/chip-group.tsx
// component=ChipGroup

import figma from "figma";

const children = (function () {
  const slot = figma.properties.slot("Content slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();
const firstChip = (function () {
  const nestedLayer59 = figma.selectedInstance.findInstance("Chip");
  return {
    variant:
      nestedLayer59.type !== "ERROR"
        ? nestedLayer59.getEnum("Variant", {
            Filter: "filter",
            Selection: "selection",
          })
        : undefined,
  };
})();
const flow = figma.selectedInstance.getEnum("Overflow", {
  Scroll: "nowrap",
});
const overflow = figma.selectedInstance.getEnum("Overflow", {
  Scroll: "auto",
});

export default {
  id: "ChipGroup",
  imports: ['import { ChipGroup } from "@reapit/elements/core/chip-group";'],
  example: figma.code`<ChipGroup${figma.helpers.react.renderProp(
    "flow",
    flow,
  )}${figma.helpers.react.renderProp(
    "overflow",
    overflow,
  )}${figma.helpers.react.renderProp("variant", firstChip.variant)}>
      {/* NOTE: use ChipGroup.Item instead of Chip.
     * ChipGroup.Item's do not need a variant specified */}
      ${figma.helpers.react.renderChildren(children)}
    </ChipGroup>`,
  metadata: { nestable: true },
};

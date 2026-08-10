// url=<BUTTON_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/button-group/button-group.tsx
// component=ButtonGroup

import figma from "figma";

const children = (function () {
  const slot = figma.properties.slot("Content slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();
const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  id: "ButtonGroup",
  imports: ['import { ButtonGroup } from "@reapit/elements/core/button-group";'],
  example: figma.code`<ButtonGroup${figma.helpers.react.renderProp("orientation", orientation)}>
      {/* TODO: Use ButtonGroup.Item instead of Button */}
      ${figma.helpers.react.renderChildren(children)}
    </ButtonGroup>`,
  metadata: { nestable: true },
};

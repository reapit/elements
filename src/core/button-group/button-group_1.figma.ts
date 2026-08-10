// url=<BUTTON_GROUP_URL_DEPRECATED>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/button-group/button-group.tsx
// component=ButtonGroup

import figma from "figma";

const children = figma.properties.children(["*"]);
const size = figma.selectedInstance.getEnum("Button size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});

export default {
  id: "ButtonGroup",
  imports: ['import { ButtonGroup } from "@reapit/elements/core/button-group";'],
  example: figma.code`<ButtonGroup${figma.helpers.react.renderProp("size", size)}>
      {/* TODO: Use ButtonGroup.Item instead of Button */}
      ${figma.helpers.react.renderChildren(children)}
    </ButtonGroup>`,
  metadata: { nestable: true },
};

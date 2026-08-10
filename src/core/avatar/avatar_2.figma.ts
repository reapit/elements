// url=<AVATAR_SQUARE_URL_DEPRECATED>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/avatar/avatar.tsx
// component=Avatar

import figma from "figma";

const children = figma.properties.children(["*"]);
const colour = figma.selectedInstance.getEnum("Colour", {
  Default: "default",
  Primary: "primary",
});
const size = figma.selectedInstance.getEnum("Size", {
  Medium: "medium",
  Small: "small",
});

export default {
  id: "Avatar",
  imports: ['import { Avatar } from "@reapit/elements/core/avatar";'],
  example: figma.code`<Avatar${figma.helpers.react.renderProp(
    "colour",
    colour,
  )} shape="square"${figma.helpers.react.renderProp("size", size)}>
      ${figma.helpers.react.renderChildren(children)}
    </Avatar>`,
  metadata: { nestable: true },
};

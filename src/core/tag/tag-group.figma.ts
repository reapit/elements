// url=<TAG_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/tag/tag.tsx
// component=Tag

import figma from "figma";

const children = figma.selectedInstance.getString("Label text");

export default {
  id: "Tag",
  imports: ['import { Tag } from "@reapit/elements/core/tag";'],
  example: figma.code`<Tag>${figma.helpers.react.renderChildren(children)}</Tag>`,
  metadata: { nestable: true },
};

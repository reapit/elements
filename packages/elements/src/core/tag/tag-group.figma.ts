// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=55-982&m=dev
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

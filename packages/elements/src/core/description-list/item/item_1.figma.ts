// url=<DESCRIPTION_LIST_ITEM_INLINE_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/description-list/description-list.tsx
// component=DescriptionList.Item

import figma from "figma";

const description = "TODO: add description content";
const label = (function () {
  const nestedLayer56 = figma.selectedInstance.findInstance("List item");
  return {
    value: nestedLayer56.type !== "ERROR" ? nestedLayer56.getString("Label") : undefined,
  };
})();
const size = figma.selectedInstance.getEnum("Size", {
  base: "base",
  sm: "sm",
});

export default {
  id: "DescriptionList.Item",
  imports: ['import { DescriptionList } from "@reapit/elements/core/description-list";'],
  example: figma.code`<DescriptionList.Item${figma.helpers.react.renderProp("label", label.value)} 
// TODO: Apply this size to the DescriptionList's size prop instead of each individual item
size=${figma.helpers.react.renderChildren(size)}>
      ${figma.helpers.react.renderChildren(description)}
    </DescriptionList.Item>`,
  metadata: { nestable: true },
};

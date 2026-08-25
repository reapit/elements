// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=18350-23293&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/description-list/description-list.tsx
// component=DescriptionList

import figma from "figma";

const children = figma.selectedInstance.getEnum("Variant", {
  "Stacked list": (function () {
    const slot = figma.properties.slot("Stacked content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
  "In-line list": (function () {
    const slot = figma.properties.slot("In-line content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
  Grid: (function () {
    const slot = figma.properties.slot("Grid content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
});
const grid = figma.selectedInstance.getEnum("Variant", {
  "Stacked list": "auto-flow / 1fr",
  "In-line list": "auto-flow / 1fr",
  Grid: "auto-flow / var(--size-36) 1fr",
});
const layout = figma.selectedInstance.getEnum("Variant", {
  "Stacked list": "stacked",
  "In-line list": "inline",
  Grid: "tabular",
});

export default {
  id: "DescriptionList",
  imports: ['import { DescriptionList } from "@reapit/elements/core/description-list";'],
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp(
    "grid",
    grid,
  )}${figma.helpers.react.renderProp("layout", layout)} 
// TODO: Update size to match description list item size. Applying the size
// here means you don't have to apply it to each individual item
size="base">
      ${figma.helpers.react.renderChildren(children)}
    </DescriptionList>`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=17741-14882&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/description-list/description-list.tsx
// component=DescriptionList

import figma from "figma";

const children = figma.properties.children(["*"]);
const grid = figma.selectedInstance.getEnum("No of columns", {
  "1": "auto-flow / 1fr",
  "2": "auto-flow / 1fr 1fr",
  "3": "auto-flow / 1fr 1fr 1fr",
});
const item1 = (function () {
  const nestedLayer53 = figma.selectedInstance.findInstance("Item 1");
  return {
    size:
      nestedLayer53.type !== "ERROR"
        ? nestedLayer53.getEnum("Size", {
            base: "base",
            sm: "sm",
          })
        : undefined,
  };
})();
const layout = figma.selectedInstance.getEnum("Item type", {
  "In-line": (function () {
    const nestedLayer54 = figma.selectedInstance.findInstance("List item");
    return {
      value:
        nestedLayer54.type !== "ERROR"
          ? nestedLayer54.getEnum("Label type", {
              Hug: "inline",
              Fill: "tabular",
            })
          : undefined,
    };
  })(),
  Stacked: { value: "stacked" },
});

export default {
  id: "DescriptionList",
  imports: ['import { DescriptionList } from "@reapit/elements/core/description-list";'],
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp(
    "grid",
    grid,
  )}${figma.helpers.react.renderProp(
    "layout",
    layout?.value,
  )}${figma.helpers.react.renderProp("size", item1.size)}>
      ${figma.helpers.react.renderChildren(children)}
    </DescriptionList>`,
  metadata: { nestable: true },
};

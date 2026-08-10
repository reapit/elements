// url=<ACCORDION_HEADER_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/accordion/accordion.tsx
// component=Accordion.Summary

import figma from "figma";

const accessory = figma.selectedInstance.getBoolean("Show accessory", {
  true: (function () {
    const nestedLayer76 = figma.selectedInstance.findInstance("Accordion header accessory");
    return {
      content:
        nestedLayer76.type !== "ERROR"
          ? nestedLayer76.children
              .filter((child) => child.type === "INSTANCE")
              .map((child) => child.executeTemplate().example)
              .flat()
          : undefined,
    };
  })(),
  false: { content: undefined },
});
const title = figma.selectedInstance.getString("Title");

export default {
  id: "Accordion.Summary",
  imports: ['import { Accordion } from "@reapit/elements/core/accordion";'],
  example: figma.code`<Accordion.Summary${figma.helpers.react.renderProp(
    "accessory",
    accessory.content,
  )}>${figma.helpers.react.renderChildren(title)}</Accordion.Summary>`,
  metadata: { nestable: true },
};

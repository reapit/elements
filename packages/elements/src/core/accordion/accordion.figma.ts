// url=<ACCORDION_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/accordion/accordion.tsx
// component=Accordion

import figma from "figma";

const accessory = figma.properties.children(["Accordion header"]);
const content = (function () {
  const slot = figma.properties.slot("Content slot");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();
const open = figma.selectedInstance.getBoolean("Expanded");

export default {
  id: "Accordion",
  imports: ['import { Accordion } from "@reapit/elements/core/accordion";'],
  example: figma.code`<Accordion${figma.helpers.react.renderProp(
    "open",
    open,
  )}${figma.helpers.react.renderProp("summary", accessory)}>
      ${figma.helpers.react.renderChildren(content)}
    </Accordion>`,
  metadata: { nestable: true },
};

// url=<ACCORDION_GROUP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/accordion-group/accordion-group.tsx
// component=AccordionGroup

import figma from "figma";

const children = (function () {
  const slot = figma.properties.slot("Accordion list");
  return slot
    ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
    : [];
})();

export default {
  id: "AccordionGroup",
  imports: ['import { AccordionGroup } from "@reapit/elements/core/accordion-group";'],
  example: figma.code`<AccordionGroup>${figma.helpers.react.renderChildren(
    children,
  )}</AccordionGroup>`,
  metadata: { nestable: true },
};

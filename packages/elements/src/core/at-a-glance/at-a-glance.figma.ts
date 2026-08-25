// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=18327-21744&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance

import figma from "figma";

const cards = figma.selectedInstance.getEnum("Variant", {
  Carousel: (function () {
    const slot = figma.properties.slot("Carousel slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
  Grid: (function () {
    const slot = figma.properties.slot("Grid slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })(),
});
const header = figma.selectedInstance.getBoolean("Show header", {
  true: figma.properties.children(["AAG header"]),
  false: undefined,
});

export default {
  id: "AtAGlance",
  imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
  example: figma.code`<AtAGlance.Listbox>
      ${figma.helpers.react.renderChildren(header)}
      ${figma.helpers.react.renderChildren(cards)}
    </AtAGlance.Listbox>`,
  metadata: { nestable: true },
};

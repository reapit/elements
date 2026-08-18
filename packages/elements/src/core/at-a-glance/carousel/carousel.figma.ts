// url=<AT_A_GLANCE_CAROUSEL_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance.Carousel

import figma from "figma";

const children = figma.properties.children(["Card *"]);

export default {
  id: "AtAGlance.Carousel",
  imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
  example: figma.code`<AtAGlance.Carousel columns="<CHANGE ME>">
      {/* Use <AtAGlance.Listbox as={AtAGlance.Carousel}> when children are AtAGlance.ListboxOption. */}
      ${figma.helpers.react.renderChildren(children)}
    </AtAGlance.Carousel>`,
  metadata: { nestable: true },
};

// url=<ACCORDION_URL_DEPRECATED>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/accordion/accordion.tsx
// component=Accordion

import figma from "figma";

const content = figma.properties.children(["Content"]);
const open = figma.selectedInstance.getBoolean("Expanded");
const accessory = figma.selectedInstance.getEnum("Variant", {
  Filters: figma.selectedInstance.getBoolean("With selection", {
    true: figma.properties.children(["Button"]),
    false: undefined,
  }),
  Standard: figma.selectedInstance.getBoolean("Show right info", {
    true: figma.properties.children(["Right info"]),
    false: undefined,
  }),
});
const title = figma.selectedInstance.getString("Title");

export default {
  id: "Accordion",
  imports: ['import { Accordion } from "@reapit/elements/core/accordion";'],
  example: figma.code`<Accordion${figma.helpers.react.renderProp(
    "open",
    open,
  )} summary={<Accordion.Summary${figma.helpers.react.renderProp(
    "accessory",
    accessory,
  )}>${figma.helpers.react.renderChildren(title)}</Accordion.Summary>}>
      ${figma.helpers.react.renderChildren(content)}
    </Accordion>`,
  metadata: { nestable: true },
};

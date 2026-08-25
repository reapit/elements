// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=15854-47023&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/at-a-glance/at-a-glance.tsx
// component=AtAGlance.Grid

import figma from "figma";

const children = figma.properties.children(["*"]);
const templateColumns = figma.selectedInstance.getEnum("Grid template", {
  "5x2": "1fr 1fr 1fr 1fr 1fr",
  "5x1": "1fr 1fr 1fr 1fr 1fr",
  "4x2": "1fr 1fr 1fr 1fr",
  "4x1": "1fr 1fr 1fr 1fr",
  "3x2": "1fr 1fr 1fr",
  "3x1": "1fr 1fr 1fr",
  "2x2": "1fr 1fr",
  "2x1": "1fr 1fr",
});

export default {
  id: "AtAGlance.Grid",
  imports: ['import { AtAGlance } from "@reapit/elements/core/at-a-glance";'],
  example: figma.code`<AtAGlance.Grid${figma.helpers.react.renderProp(
    "templateColumns",
    templateColumns,
  )}>
      {/* Use <AtAGlance.Listbox as={AtAGlance.Grid}> when children are AtAGlance.ListboxOption. */}
      ${figma.helpers.react.renderChildren(children)}
    </AtAGlance.Grid>`,
  metadata: { nestable: true },
};

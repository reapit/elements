// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=16826-10102&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/utils/combobox/card-default-content/card-default-content.tsx
// component=ComboboxCardDefaultContent

import figma from "figma";

const additionalInfo = figma.properties.children(["Supplementary info *"]);
const label = figma.selectedInstance.getString("Selected item label");

export default {
  id: "ComboboxCardDefaultContent",
  imports: ['import { ComboboxCardDefaultContent } from "@reapit/elements/utils/combobox";'],
  example: figma.code`// Use CardDefaultContent via Autocomplete or Select instead of Combobox.
<ComboboxCardDefaultContent${figma.helpers.react.renderProp("additionalInfo", additionalInfo)}>
      ${figma.helpers.react.renderChildren(label)}
    </ComboboxCardDefaultContent>`,
  metadata: { nestable: true },
};

// url=<COMBOBOX_OPTION_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/utils/combobox/option/option.tsx
// component=ComboboxOption

import figma from "figma";

const badge = figma.selectedInstance.getBoolean("Show badge", {
  true: figma.selectedInstance.getBoolean("Selected", {
    true: figma.properties.children(["Line 1 Badge"]),
    false: figma.properties.children(["Badge"]),
  }),
  false: undefined,
});
const label = figma.selectedInstance.getString("Label");
const additionalInfo = figma.properties.children(["Additional info *"]);

export default {
  id: "ComboboxOption",
  imports: ['import { ComboboxOption } from "@reapit/elements/utils/combobox";'],
  example: figma.code`// Use Option via Autocomplete, CompactSelect or Select instead of Combobox.
<ComboboxOption${figma.helpers.react.renderProp("badge", badge)}${figma.helpers.react.renderProp(
    "additionalInfo",
    additionalInfo,
  )} value="REPLACE ME">
      ${figma.helpers.react.renderChildren(label)}
    </ComboboxOption>`,
  metadata: { nestable: true },
};

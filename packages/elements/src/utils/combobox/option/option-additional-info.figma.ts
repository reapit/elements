// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=16645-133557&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/utils/combobox/option/option-additional-info.tsx
// component=ComboboxOptionAdditionalInfo

import figma from "figma";

const badge = figma.selectedInstance.getBoolean("Show badge", {
  true: figma.properties.children(["Badge"]),
  false: undefined,
});
const icon = figma.selectedInstance.getBoolean("Show icon", {
  true: figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example,
  false: undefined,
});
const label = figma.properties.children(["Supplementary info"]);

export default {
  id: "ComboboxOptionAdditionalInfo",
  imports: ['import { ComboboxOptionAdditionalInfo } from "@reapit/elements/utils/combobox";'],
  example: figma.code`// Use OptionAdditionalInfo via Autocomplete, CompactSelect or Select instead of Combobox.
<ComboboxOptionAdditionalInfo${figma.helpers.react.renderProp(
    "badge",
    badge,
  )}${figma.helpers.react.renderProp("icon", icon)}>
      ${figma.helpers.react.renderChildren(label)}
    </ComboboxOptionAdditionalInfo>`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=16645-133690&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/utils/combobox/optgroup/optgroup.tsx
// component=ComboboxOptgroup

import figma from "figma";

const label = figma.selectedInstance.getString("Group title");
const children = figma.properties.children(["List item *"]);

export default {
  id: "ComboboxOptgroup",
  imports: ['import { ComboboxOptgroup } from "@reapit/elements/utils/combobox";'],
  example: figma.code`// Use Optgroup via Autocomplete, CompactSelect or Select instead of Combobox.
<ComboboxOptgroup${figma.helpers.react.renderProp(
    "label",
    label,
  )}>${figma.helpers.react.renderChildren(children)}</ComboboxOptgroup>`,
  metadata: { nestable: true },
};

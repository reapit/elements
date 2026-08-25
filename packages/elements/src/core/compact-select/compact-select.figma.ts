// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12386-28538&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/compact-select/compact-select.tsx
// component=CompactSelect

import figma from "figma";

const size = figma.selectedInstance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const selectionLabel = figma.selectedInstance.getString("Selection label");

export default {
  id: "CompactSelect",
  imports: ['import { CompactSelect } from "@reapit/elements/core/compact-select";'],
  example: figma.code`<CompactSelect${figma.helpers.react.renderProp("size", size)}>
      <CompactSelect.Button${figma.helpers.react.renderProp("placeholder", selectionLabel)}/>
      <CompactSelect.Popup>
        <CompactSelect.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement options */}
        </CompactSelect.Listbox>
      </CompactSelect.Popup>
    </CompactSelect>`,
  metadata: { nestable: true },
};

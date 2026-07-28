import figma from "@figma/code-connect";

import { CompactSelect } from "./compact-select";

figma.connect(CompactSelect, "<COMPACT_SELECT_URL>", {
  props: {
    size: figma.enum("Size", {
      Small: "small",
      Medium: "medium",
      Large: "large",
    }),
    selectionLabel: figma.string("Selection label"),
  },
  example: (props) => (
    <CompactSelect size={props.size}>
      <CompactSelect.Button placeholder={props.selectionLabel} />
      <CompactSelect.Popup>
        <CompactSelect.Listbox name="<REPLACE_ME>">
          {/* TODO: Implement options */}
        </CompactSelect.Listbox>
      </CompactSelect.Popup>
    </CompactSelect>
  ),
});

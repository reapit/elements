import figma from "@figma/code-connect";

import { ComboboxOption } from "./option";

figma.connect(ComboboxOption, "<COMBOBOX_OPTION_URL>", {
  props: {
    badge: figma.boolean("Show badge", {
      true: figma.boolean("Selected", {
        true: figma.children("Line 1 Badge"),
        false: figma.children("Badge"),
      }),
      false: undefined,
    }),
    label: figma.string("Label"),
    additionalInfo: figma.children("Additional info *"),
  },
  example: (props) => (
    // Use Option via Autocomplete, CompactSelect or Select instead of Combobox.
    <ComboboxOption badge={props.badge} additionalInfo={props.additionalInfo} value="REPLACE ME">
      {props.label}
    </ComboboxOption>
  ),
});

import figma from "@figma/code-connect";

import { ComboboxOptionAdditionalInfo } from "./option-additional-info";

figma.connect(ComboboxOptionAdditionalInfo, "<COMBOBOX_OPTION_ADDITIONAL_INFO_URL>", {
  props: {
    badge: figma.boolean("Show badge", {
      true: figma.children("Badge"),
      false: undefined,
    }),
    icon: figma.boolean("Show icon", {
      true: figma.instance("Icon"),
      false: undefined,
    }),
    label: figma.children("Supplementary info"),
  },
  example: (props) => (
    // Use OptionAdditionalInfo via Autocomplete, CompactSelect or Select instead of Combobox.
    <ComboboxOptionAdditionalInfo badge={props.badge} icon={props.icon}>
      {props.label}
    </ComboboxOptionAdditionalInfo>
  ),
});

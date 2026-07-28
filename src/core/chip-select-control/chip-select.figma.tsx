import figma from "@figma/code-connect";

import { ChipSelectControl } from "../chip-select-control";

figma.connect(ChipSelectControl, "<CHIP_SELECT_URL>", {
  props: {
    // TODO: Will not currently capture all options, as some are named as "Interactive chip"
    children: figma.children("Chip*"),
    errorText: figma.enum("State", {
      Error: figma.string("Error text"),
    }),
    helpText: figma.boolean("Show helper", {
      true: figma.string("Helper text"),
      false: undefined,
    }),
    label: figma.boolean("Show label", {
      true: figma.nestedProps("LabelText", {
        text: figma.string("Label text"),
        required: figma.boolean("Required"),
      }),
      false: {
        text: undefined,
        required: undefined,
      },
    }),
    size: figma.enum("Size", {
      Small: "small",
      Medium: "medium",
      Large: "large",
    }),
  },
  example: ({ children, label, size }) => (
    <ChipSelectControl label={label.text} name="change-me" required={label.required} size={size}>
      {/* NOTE: Use ChipSelectControl.Option instead of ChipSelect.Option */}
      {children}
    </ChipSelectControl>
  ),
});

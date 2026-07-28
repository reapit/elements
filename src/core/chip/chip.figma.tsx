import figma from "@figma/code-connect";

import { Chip } from "./chip";

figma.connect(Chip, "<CHIP_URL>", {
  variant: { Clearable: true },
  props: {
    children: figma.string("Label"),
    disabled: figma.enum("State", {
      Disabled: true,
    }),
    variant: figma.enum("Variant", {
      Filter: "filter",
      Selection: "selection",
    }),
  },
  example: ({ children, ...rest }) => <Chip {...rest}>{children}</Chip>,
});

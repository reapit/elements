import figma from "@figma/code-connect";

import { Divider } from "./divider";

figma.connect(Divider, "<DIVIDER_URL>", {
  props: {
    ariaOrientation: figma.enum("Orientation", {
      Horizontal: "horizontal",
      Vertical: "vertical",
    }),
    variant: figma.enum("Style", {
      Solid: "solid",
      Dashed: "dashed",
    }),
  },
  example: (props) => <Divider aria-orientation={props.ariaOrientation} variant={props.variant} />,
});

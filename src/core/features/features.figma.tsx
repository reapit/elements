import figma from "@figma/code-connect";

import { Features } from "./features";

figma.connect(Features, "<FEATURES_URL>", {
  props: {
    size: figma.enum("Size", {
      "2xs": "2xs",
      xs: "xs",
      sm: "sm",
      base: "base",
    }),
    children: figma.children("*"),
  },
  example: (props) => (
    <Features size={props.size}>
      {/* NOTE: Use Features.Bathrooms, Features.Bedrooms, Features.CarSpaces
       * or Features.LandSize for common feature items */}
      {props.children}
    </Features>
  ),
});

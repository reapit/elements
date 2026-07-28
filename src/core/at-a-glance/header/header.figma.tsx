import figma from "@figma/code-connect";

import { AtAGlance } from "../at-a-glance";

figma.connect(AtAGlance.Header, "<AT_A_GLANCE_HEADER_URL>", {
  props: {
    accessory: figma.boolean("Show accessory", {
      true: figma.instance("Accessory"),
      false: undefined,
    }),
    children: figma.string("Title"),
  },
  example: (props) => (
    <AtAGlance.Header accessory={props.accessory}>{props.children}</AtAGlance.Header>
  ),
});

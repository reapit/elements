import figma from "@figma/code-connect";

import { Accordion } from "../accordion";

figma.connect(Accordion.Summary, "<ACCORDION_HEADER_URL>", {
  props: {
    accessory: figma.boolean("Show accessory", {
      true: figma.nestedProps("Accordion header accessory", {
        content: figma.children("*"),
      }),
      false: {
        content: undefined,
      },
    }),
    title: figma.string("Title"),
  },
  example: (props) => (
    <Accordion.Summary accessory={props.accessory.content}>{props.title}</Accordion.Summary>
  ),
});

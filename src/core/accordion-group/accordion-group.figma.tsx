import figma from "@figma/code-connect";

import { AccordionGroup } from "./accordion-group";

figma.connect(AccordionGroup, "<ACCORDION_GROUP_URL>", {
  props: {
    children: figma.slot("Accordion list").connectedInstances,
  },
  example: (props) => <AccordionGroup>{props.children}</AccordionGroup>,
});

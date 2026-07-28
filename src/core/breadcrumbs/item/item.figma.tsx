import figma from "@figma/code-connect";

import { Breadcrumbs } from "../breadcrumbs";

figma.connect(Breadcrumbs.Item, "<BREADCRUMB_ITEM_URL>", {
  props: {
    children: figma.children("Breadcrumb link*"),
  },
  example: (props) => <Breadcrumbs.Item>{props.children}</Breadcrumbs.Item>,
});

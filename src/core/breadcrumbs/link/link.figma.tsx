import figma from "@figma/code-connect";

import { Breadcrumbs } from "../breadcrumbs";

figma.connect(Breadcrumbs.Link, "<BREADCRUMB_LINK_URL>", {
  props: {
    children: figma.string("Link text"),
  },
  example: (props) => <Breadcrumbs.Link href="#replace-me">{props.children}</Breadcrumbs.Link>,
});

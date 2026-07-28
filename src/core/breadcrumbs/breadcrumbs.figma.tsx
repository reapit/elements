import figma from "@figma/code-connect";

import { Breadcrumbs } from "./breadcrumbs";

figma.connect(Breadcrumbs, "<BREADCRUMBS_URL>", {
  props: {
    children: figma.children("*"),
  },
  example: (props) => <Breadcrumbs>{props.children}</Breadcrumbs>,
});

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6909-7884&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/breadcrumbs/breadcrumbs.tsx
// component=Breadcrumbs

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "Breadcrumbs",
  imports: ['import { Breadcrumbs } from "@reapit/elements/core/breadcrumbs";'],
  example: figma.code`<Breadcrumbs>${figma.helpers.react.renderChildren(children)}</Breadcrumbs>`,
  metadata: { nestable: true },
};

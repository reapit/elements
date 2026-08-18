// url=<BREADCRUMBS_URL>
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

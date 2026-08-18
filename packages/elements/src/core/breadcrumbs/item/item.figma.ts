// url=<BREADCRUMB_ITEM_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/breadcrumbs/breadcrumbs.tsx
// component=Breadcrumbs.Item

import figma from "figma";

const children = figma.properties.children(["Breadcrumb link*"]);

export default {
  id: "Breadcrumbs.Item",
  imports: ['import { Breadcrumbs } from "@reapit/elements/core/breadcrumbs";'],
  example: figma.code`<Breadcrumbs.Item>${figma.helpers.react.renderChildren(
    children,
  )}</Breadcrumbs.Item>`,
  metadata: { nestable: true },
};

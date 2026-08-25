// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6903-9696&m=dev
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

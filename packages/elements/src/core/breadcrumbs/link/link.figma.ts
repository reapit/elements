// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6903-9655&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/breadcrumbs/breadcrumbs.tsx
// component=Breadcrumbs.Link

import figma from "figma";

const children = figma.selectedInstance.getString("Link text");

export default {
  id: "Breadcrumbs.Link",
  imports: ['import { Breadcrumbs } from "@reapit/elements/core/breadcrumbs";'],
  example: figma.code`<Breadcrumbs.Link href="#replace-me">${figma.helpers.react.renderChildren(
    children,
  )}</Breadcrumbs.Link>`,
  metadata: { nestable: true },
};

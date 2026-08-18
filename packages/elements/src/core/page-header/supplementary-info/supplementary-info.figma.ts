// url=<PAGE_HEADER_SUPPLEMENTARY_INFO_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-header/page-header.tsx
// component=PageHeader.SupplementaryInfo

import figma from "figma";

const children = figma.properties.children(["*"]);

export default {
  id: "PageHeader.SupplementaryInfo",
  imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
  example: figma.code`<PageHeader.SupplementaryInfo>${figma.helpers.react.renderChildren(
    children,
  )}</PageHeader.SupplementaryInfo>`,
  metadata: { nestable: true },
};

// url=<PAGE_HEADER_LEADING_ELEMENT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-header/page-header.tsx
// component=PageHeader.LeadingElement

import figma from "figma";

const type = figma.selectedInstance.getEnum("Type", {
  Image: "image",
  Icon: "icon",
});

export default {
  id: "PageHeader.LeadingElement",
  imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
  example: figma.code`<PageHeader.LeadingElement${figma.helpers.react.renderProp("type", type)}>
      TODO: Add leading element content
    </PageHeader.LeadingElement>`,
  metadata: { nestable: true },
};

// url=<PAGE_HEADER_SUBTITLE_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-header/page-header.tsx
// component=PageHeader.Subtitle

import figma from "figma";

const badge = figma.properties.children(["Badge"]);
const icon = figma.properties.children(["Icon"]);
const subtitle = figma.selectedInstance.getString("Page subtitle");
const tags = figma.properties.children(["Tag group"]);

export default {
  id: "PageHeader.Subtitle",
  imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
  example: figma.code`<PageHeader.Subtitle additionalInfo={<>
          ${figma.helpers.react.renderChildren(tags)}
          ${figma.helpers.react.renderChildren(badge)}
          ${figma.helpers.react.renderChildren(icon)}
        </>}>
      ${figma.helpers.react.renderChildren(subtitle)}
    </PageHeader.Subtitle>`,
  metadata: { nestable: true },
};

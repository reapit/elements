// url=<TOOLTIP_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/tooltip/tooltip.tsx
// component=Tooltip

import figma from "figma";

const children = figma.selectedInstance.getString("Description");

export default {
  id: "Tooltip",
  imports: ['import { Tooltip } from "@reapit/elements/core/tooltip";'],
  example: figma.code`<Tooltip id="my-tooltip-id" triggerId="my-trigger-id" truncationTargetId="optional-truncation-target-id">
      ${figma.helpers.react.renderChildren(children)}
    </Tooltip>`,
  metadata: { nestable: true },
};

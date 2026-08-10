// url=<PROGRESS_INDICATOR_DETERMINATE_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/progress-indicator/progress-indicator.tsx
// component=ProgressIndicator

import figma from "figma";

export default {
  id: "ProgressIndicator",
  imports: ['import { ProgressIndicator } from "@reapit/elements/core/progress-indicator";'],
  example: figma.code`<ProgressIndicator aria-label="Progress" value={50}/>`,
};

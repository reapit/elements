// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14908-60908&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/office-switcher/office-switcher.tsx
// component=OfficeSwitcher.Option

import figma from "figma";

const label = figma.selectedInstance.getString("Office label");
const badge = figma.selectedInstance.getBoolean("Show Badge", {
  true: figma.properties.children(["Badge"]),
  false: undefined,
});

export default {
  id: "OfficeSwitcher.Option",
  imports: ['import { OfficeSwitcher } from "@reapit/elements/core/office-switcher";'],
  example: figma.code`<OfficeSwitcher.Option${figma.helpers.react.renderProp(
    "badge",
    badge,
  )} value="<REPLACE_ME>">
      ${figma.helpers.react.renderChildren(label)}
    </OfficeSwitcher.Option>`,
  metadata: { nestable: true },
};

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=2355-9778&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/split-button/split-button.tsx
// component=SplitButton.Action

import figma from "figma";

const children = figma.selectedInstance.getString("Label");
const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});

export default {
  id: "SplitButton.Action",
  imports: ['import { SplitButton } from "@reapit/elements/core/split-button";'],
  example: figma.code`<SplitButton.Action${figma.helpers.react.renderProp("disabled", disabled)}>
      {/* Use SplitButton.AnchorAction for main actions that involve navigation */}
      ${figma.helpers.react.renderChildren(children)}
    </SplitButton.Action>`,
  metadata: { nestable: true },
};

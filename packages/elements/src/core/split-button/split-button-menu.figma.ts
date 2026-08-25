// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=2355-10149&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/split-button/split-button.tsx
// component=SplitButton.Menu

import figma from "figma";

const disabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});

export default {
  id: "SplitButton.Menu",
  imports: ['import { SplitButton } from "@reapit/elements/core/split-button";'],
  example: figma.code`<SplitButton.Menu aria-label="Replace me"${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}>
      TODO: Add menu items
    </SplitButton.Menu>`,
  metadata: { nestable: true },
};

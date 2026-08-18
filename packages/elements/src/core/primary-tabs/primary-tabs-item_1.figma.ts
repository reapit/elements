// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=21138-131622&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/primary-tabs/tab/tab.tsx
// component=PrimaryTabs.Item

import figma from "figma";

const children = figma.selectedInstance.getString("Tab label");
const ariaCurrent = figma.selectedInstance.getEnum("Selected", {
  True: "page",
  False: false,
});
const ariaDisabled = figma.selectedInstance.getEnum("State", {
  Disabled: true,
});
const icon = figma.selectedInstance.getBoolean("Show icon", {
  true: figma.selectedInstance.getInstanceSwap("↳ Icon")?.executeTemplate().example,
  false: undefined,
});
const badge = figma.selectedInstance.getBoolean("Show badge", {
  true: (function () {
    const badge = figma.selectedInstance.findInstance("Badge");
    return badge.type !== "ERROR" ? badge.executeTemplate().example : undefined;
  })(),
  false: undefined,
});

export default {
  id: "PrimaryTabs.Item",
  imports: ['import { PrimaryTabs } from "@reapit/elements/core/primary-tabs";'],
  example: figma.code`<PrimaryTabs.Item${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )}${figma.helpers.react.renderProp("aria-disabled", ariaDisabled)} href="#replace-me"${figma.helpers.react.renderProp(
    "icon",
    icon,
  )}${figma.helpers.react.renderProp("badge", badge)}>
      ${figma.helpers.react.renderChildren(children)}
    </PrimaryTabs.Item>`,
  metadata: { nestable: true },
};

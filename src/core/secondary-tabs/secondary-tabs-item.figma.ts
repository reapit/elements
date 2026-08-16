// url=<SECONDARY_TAB_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/secondary-tabs/secondary-tabs.tsx
// component=SecondaryTabs.Item

import figma from "figma";

const ariaCurrent = figma.selectedInstance.getEnum("Selected", {
  true: "page",
  false: false,
});
const ariaDisabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Hovered: false,
  Focused: false,
  Disabled: true,
});
const children = figma.selectedInstance.getString("Tab name");
const badge = figma.selectedInstance.findInstance("Badge")?.executeTemplate()?.example;

export default {
  id: "SecondaryTabs.Item",
  imports: ['import { SecondaryTabs } from "@reapit/elements/core/secondary-tabs";'],
  example: figma.code`<SecondaryTabs.Item${figma.helpers.react.renderProp(
    "aria-current",
    ariaCurrent,
  )}${figma.helpers.react.renderProp(
    "aria-disabled",
    ariaDisabled,
  )}${figma.helpers.react.renderProp("badge", badge)} href="#replace-me">
      ${figma.helpers.react.renderChildren(children)}
    </SecondaryTabs.Item>`,
  metadata: { nestable: true },
};

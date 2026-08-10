// url=<SECONDARY_TAB_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/secondary-tabs/secondary-tabs.tsx
// component=SecondaryTabs.Item

import figma from "figma";

const children = figma.selectedInstance.getString("Tab name");

export default {
  id: "SecondaryTabs.Item",
  imports: ['import { SecondaryTabs } from "@reapit/elements/core/secondary-tabs";'],
  example: figma.code`<SecondaryTabs.Item aria-current={false} href="#replace-me">
      ${figma.helpers.react.renderChildren(children)}
    </SecondaryTabs.Item>`,
  metadata: { nestable: true },
};

// url=<PRIMARY_TAB_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/primary-tabs/primary-tabs.tsx
// component=PrimaryTabs.Item

import figma from "figma";

const children = figma.selectedInstance.getString("Tab name");

export default {
  id: "PrimaryTabs.Item",
  imports: ['import { PrimaryTabs } from "@reapit/elements/core/primary-tabs";'],
  example: figma.code`<PrimaryTabs.Item aria-current={false} href="#replace-me">
      ${figma.helpers.react.renderChildren(children)}
    </PrimaryTabs.Item>`,
  metadata: { nestable: true },
};

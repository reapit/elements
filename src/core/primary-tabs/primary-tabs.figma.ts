// url=<PRIMARY_TABS_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/primary-tabs/primary-tabs.tsx
// component=PrimaryTabs

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Default") {
  const children = figma.properties.children(["Tab item"]);

  template = {
    id: "PrimaryTabs",
    imports: ['import { PrimaryTabs } from "@reapit/elements/core/primary-tabs";'],
    example: figma.code`<PrimaryTabs>${figma.helpers.react.renderChildren(children)}</PrimaryTabs>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.properties.children(["Tab item"]);

  template = {
    id: "PrimaryTabs",
    imports: ['import { PrimaryTabs } from "@reapit/elements/core/primary-tabs";'],
    example: figma.code`<PrimaryTabs>${figma.helpers.react.renderChildren(children)}</PrimaryTabs>`,
    metadata: { nestable: true },
  };
}

export default template;

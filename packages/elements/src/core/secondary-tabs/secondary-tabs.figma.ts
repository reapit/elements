// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=21142-132872&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/secondary-tabs/secondary-tabs.tsx
// component=SecondaryTabs

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Secondary") {
  const children = figma.properties.children(["Secondary tab item"]);

  template = {
    id: "SecondaryTabs",
    imports: ['import { SecondaryTabs } from "@reapit/elements/core/secondary-tabs";'],
    example: figma.code`<SecondaryTabs>${figma.helpers.react.renderChildren(
      children,
    )}</SecondaryTabs>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.properties.children(["Secondary tab item"]);

  template = {
    id: "SecondaryTabs",
    imports: ['import { SecondaryTabs } from "@reapit/elements/core/secondary-tabs";'],
    example: figma.code`<SecondaryTabs>${figma.helpers.react.renderChildren(
      children,
    )}</SecondaryTabs>`,
    metadata: { nestable: true },
  };
}

export default template;

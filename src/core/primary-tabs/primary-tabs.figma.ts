// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=21138-131345&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/primary-tabs/primary-tabs.tsx
// component=PrimaryTabs

import figma from "figma";

const justifyContent = figma.selectedInstance.getEnum("Variant", {
  Hug: undefined,
  Justified: "stretch",
});
const children =
  figma.selectedInstance.getPropertyValue("Variant") === "Justified"
    ? figma.selectedInstance.getSlot("Content slot [justified]")
    : figma.selectedInstance.getSlot("Content slot [hug]");

export default {
  id: "PrimaryTabs",
  imports: ['import { PrimaryTabs } from "@reapit/elements/core/primary-tabs";'],
  example: figma.code`<PrimaryTabs${figma.helpers.react.renderProp("justifyContent", justifyContent)}>${children}</PrimaryTabs>`,
  metadata: { nestable: true },
};

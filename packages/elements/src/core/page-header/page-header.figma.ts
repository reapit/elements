// url=<PAGE_HEADER_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-header/page-header.tsx
// component=PageHeader

import figma from "figma";

const navigation = (function () {
  const nestedLayer34 = figma.selectedInstance.findInstance("Navigation");
  return {
    children:
      nestedLayer34.type !== "ERROR"
        ? nestedLayer34.children
            .filter((child) => child.type === "INSTANCE")
            .map((child) => child.executeTemplate().example)
            .flat()
        : undefined,
  };
})();
const leadingElement = figma.properties.children(["Leading element"]);
const size = figma.selectedInstance.getEnum("Main container size", {
  Fluid: "fluid",
  Narrow: "narrow",
  Wide: "wide",
});
const subtitle = figma.properties.children(["Line 2"]);
const supplementaryInfo = figma.properties.children(["Line 3"]);
const title = figma.properties.children(["Title row"]);

export default {
  id: "PageHeader",
  imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
  example: figma.code`<PageHeader${figma.helpers.react.renderProp(
    "leadingElement",
    leadingElement,
  )}${figma.helpers.react.renderProp(
    "navigation",
    navigation.children,
  )}${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp(
    "subtitle",
    subtitle,
  )}${figma.helpers.react.renderProp(
    "supplementaryInfo",
    supplementaryInfo,
  )}${figma.helpers.react.renderProp("title", title)}/>`,
  metadata: { nestable: true },
};

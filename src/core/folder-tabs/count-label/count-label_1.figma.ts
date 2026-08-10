// url=<FOLDER_TAB_ITEM_CONTENT_XS_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/folder-tabs/folder-tabs.tsx
// component=FolderTabs.CountLabel

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Count") {
  const children = figma.selectedInstance.getString("Label");
  const count = figma.selectedInstance.getString("Count");

  template = {
    id: "FolderTabs.CountLabel",
    imports: ['import { FolderTabs } from "@reapit/elements/core/folder-tabs";'],
    example: figma.code`<FolderTabs.CountLabel${figma.helpers.react.renderProp(
      "count",
      count,
    )}>${figma.helpers.react.renderChildren(children)}</FolderTabs.CountLabel>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.selectedInstance.getString("Label");
  const count = figma.selectedInstance.getString("Count");

  template = {
    id: "FolderTabs.CountLabel",
    imports: ['import { FolderTabs } from "@reapit/elements/core/folder-tabs";'],
    example: figma.code`<FolderTabs.CountLabel${figma.helpers.react.renderProp(
      "count",
      count,
    )}>${figma.helpers.react.renderChildren(children)}</FolderTabs.CountLabel>`,
    metadata: { nestable: true },
  };
}

export default template;

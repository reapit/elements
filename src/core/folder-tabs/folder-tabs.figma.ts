// url=<FOLDER_TABS_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/folder-tabs/folder-tabs.tsx
// component=FolderTabs

import figma from "figma";

const children = figma.properties.children(["Folder tabs"]);

export default {
  id: "FolderTabs",
  imports: ['import { FolderTabs } from "@reapit/elements/core/folder-tabs";'],
  example: figma.code`<FolderTabs>${figma.helpers.react.renderChildren(children)}</FolderTabs>`,
  metadata: { nestable: true },
};

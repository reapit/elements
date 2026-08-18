// url=<FOLDER_TAB_ITEM_XS_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/folder-tabs/folder-tabs.tsx
// component=FolderTabs.Item

import figma from "figma";

const children = figma.properties.children(["↳Content"]);

export default {
  id: "FolderTabs.Item",
  imports: ['import { FolderTabs } from "@reapit/elements/core/folder-tabs";'],
  example: figma.code`<FolderTabs.Item aria-current={false} href="#replace-me">
      ${figma.helpers.react.renderChildren(children)}
    </FolderTabs.Item>`,
  metadata: { nestable: true },
};

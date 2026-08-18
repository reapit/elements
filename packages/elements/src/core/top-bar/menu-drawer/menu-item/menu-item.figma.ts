// url=<TOP_BAR_MENU_ITEM_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Simple") {
  const item = (function () {
    const nestedLayer4 = figma.selectedInstance.findInstance("Top item");
    return {
      hasBadge:
        nestedLayer4.type !== "ERROR" ? nestedLayer4.getBoolean("Notification badge") : undefined,
      label: nestedLayer4.type !== "ERROR" ? nestedLayer4.getString("Label") : undefined,
    };
  })();

  template = {
    id: "TopBar",
    imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
    example: figma.code`<TopBar.MenuItem aria-current={false}${figma.helpers.react.renderProp(
      "hasBadge",
      item.hasBadge,
    )} href="<REPLACE_ME>">
      ${figma.helpers.react.renderChildren(item.label)}
    </TopBar.MenuItem>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Type") === "Expandable") {
  const summary = (function () {
    const nestedLayer5 = figma.selectedInstance.findInstance("Top item");
    return {
      hasBadge:
        nestedLayer5.type !== "ERROR" ? nestedLayer5.getBoolean("Notification badge") : undefined,
      label: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Label") : undefined,
    };
  })();
  const submenu = figma.properties.children(["Submenu"]);

  template = {
    id: "TopBar",
    imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
    example: figma.code`<TopBar.MenuGroup summary={<TopBar.MenuGroupSummary${figma.helpers.react.renderProp(
      "hasBadge",
      summary.hasBadge,
    )}>
          ${figma.helpers.react.renderChildren(summary.label)}
        </TopBar.MenuGroupSummary>}>
      ${figma.helpers.react.renderChildren(submenu)}
    </TopBar.MenuGroup>`,
    metadata: { nestable: true },
  };
} else {
  const summary = (function () {
    const nestedLayer5 = figma.selectedInstance.findInstance("Top item");
    return {
      hasBadge:
        nestedLayer5.type !== "ERROR" ? nestedLayer5.getBoolean("Notification badge") : undefined,
      label: nestedLayer5.type !== "ERROR" ? nestedLayer5.getString("Label") : undefined,
    };
  })();
  const submenu = figma.properties.children(["Submenu"]);

  template = {
    id: "TopBar",
    imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
    example: figma.code`<TopBar.MenuGroup summary={<TopBar.MenuGroupSummary${figma.helpers.react.renderProp(
      "hasBadge",
      summary.hasBadge,
    )}>
          ${figma.helpers.react.renderChildren(summary.label)}
        </TopBar.MenuGroupSummary>}>
      ${figma.helpers.react.renderChildren(submenu)}
    </TopBar.MenuGroup>`,
    metadata: { nestable: true },
  };
}

export default template;

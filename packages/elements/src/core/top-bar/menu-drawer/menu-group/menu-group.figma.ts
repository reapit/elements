// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35217&m=dev
// component=TopBar

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Expandable") {
  const summary = (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance("Top item");
    return {
      hasBadge:
        nestedLayer0.type !== "ERROR" ? nestedLayer0.getBoolean("Notification badge") : undefined,
      label: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Label") : undefined,
    };
  })();
  const submenu = figma.properties.children(["Submenu"]);

  template = {
    id: "TopBar",
    imports: ["import { TopBar } from '@reapit/elements/core/top-bar';"],
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
    const nestedLayer0 = figma.selectedInstance.findInstance("Top item");
    return {
      hasBadge:
        nestedLayer0.type !== "ERROR" ? nestedLayer0.getBoolean("Notification badge") : undefined,
      label: nestedLayer0.type !== "ERROR" ? nestedLayer0.getString("Label") : undefined,
    };
  })();
  const submenu = figma.properties.children(["Submenu"]);

  template = {
    id: "TopBar",
    imports: ["import { TopBar } from '@reapit/elements/core/top-bar';"],
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

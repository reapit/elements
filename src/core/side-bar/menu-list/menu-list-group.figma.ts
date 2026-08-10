// url=<SIDE_BAR_MENU_ITEM_URL>
// component=SideBar.MenuGroup

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Expandable") {
  const children = figma.properties.children(["Submenu"]);
  const expanded = figma.selectedInstance.getBoolean("Expanded");
  const summary = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("Main item");
    return {
      label: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Label") : undefined,
      icon:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();

  template = {
    id: "SideBar.MenuGroup",
    imports: ["import { SideBar } from '@reapit/elements/core/side-bar';"],
    example: figma.code`<SideBar.MenuGroup${figma.helpers.react.renderProp(
      "open",
      expanded,
    )} summary={<SideBar.MenuGroupSummary${figma.helpers.react.renderProp("icon", summary.icon)}>
          ${figma.helpers.react.renderChildren(summary.label)}
        </SideBar.MenuGroupSummary>}>
      ${figma.helpers.react.renderChildren(children)}
    </SideBar.MenuGroup>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.properties.children(["Submenu"]);
  const expanded = figma.selectedInstance.getBoolean("Expanded");
  const summary = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("Main item");
    return {
      label: nestedLayer1.type !== "ERROR" ? nestedLayer1.getString("Label") : undefined,
      icon:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();

  template = {
    id: "SideBar.MenuGroup",
    imports: ["import { SideBar } from '@reapit/elements/core/side-bar';"],
    example: figma.code`<SideBar.MenuGroup${figma.helpers.react.renderProp(
      "open",
      expanded,
    )} summary={<SideBar.MenuGroupSummary${figma.helpers.react.renderProp("icon", summary.icon)}>
          ${figma.helpers.react.renderChildren(summary.label)}
        </SideBar.MenuGroupSummary>}>
      ${figma.helpers.react.renderChildren(children)}
    </SideBar.MenuGroup>`,
    metadata: { nestable: true },
  };
}

export default template;

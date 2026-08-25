// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35439&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/side-bar/side-bar.tsx
// component=SideBar.MenuItem

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Simple") {
  const ariaCurrent = figma.selectedInstance.getEnum("Selected", {
    true: "page",
    false: false,
  });
  const item = (function () {
    const nestedLayer24 = figma.selectedInstance.findInstance("Main item");
    return {
      label: nestedLayer24.type !== "ERROR" ? nestedLayer24.getString("Label") : undefined,
      icon:
        nestedLayer24.type !== "ERROR"
          ? nestedLayer24.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();

  template = {
    id: "SideBar.MenuItem",
    imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
    example: figma.code`<SideBar.MenuItem${figma.helpers.react.renderProp(
      "aria-current",
      ariaCurrent,
    )} href="#replace-me"${figma.helpers.react.renderProp("icon", item.icon)}>
      ${figma.helpers.react.renderChildren(item.label)}
    </SideBar.MenuItem>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Type") === "Expandable") {
  const children = figma.properties.children(["Submenu"]);
  const expanded = figma.selectedInstance.getBoolean("Expanded");
  const summary = (function () {
    const nestedLayer25 = figma.selectedInstance.findInstance("Main item");
    return {
      label: nestedLayer25.type !== "ERROR" ? nestedLayer25.getString("Label") : undefined,
      icon:
        nestedLayer25.type !== "ERROR"
          ? nestedLayer25.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();

  template = {
    id: "SideBar.MenuGroup",
    imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
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
    const nestedLayer25 = figma.selectedInstance.findInstance("Main item");
    return {
      label: nestedLayer25.type !== "ERROR" ? nestedLayer25.getString("Label") : undefined,
      icon:
        nestedLayer25.type !== "ERROR"
          ? nestedLayer25.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
    };
  })();

  template = {
    id: "SideBar.MenuGroup",
    imports: ['import { SideBar } from "@reapit/elements/core/side-bar";'],
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

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-35532&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/bottom-bar/bottom-bar.tsx
// component=BottomBar

import figma from "figma";

// Branch per variant combination.

let template;
if (figma.selectedInstance.getPropertyValue("Items") === "6+") {
  const children = figma.properties.children(["Item*"]);
  const moreButton = (function () {
    const nestedLayer63 = figma.selectedInstance.findInstance("More button");
    return {
      hasBadge: nestedLayer63.type !== "ERROR" ? nestedLayer63.getBoolean("Badge") : undefined,
      icon:
        nestedLayer63.type !== "ERROR"
          ? nestedLayer63.getInstanceSwap("Icon")?.executeTemplate().example
          : undefined,
      label: nestedLayer63.type !== "ERROR" ? nestedLayer63.getString("Label") : undefined,
    };
  })();

  template = {
    id: "BottomBar",
    imports: ['import { BottomBar } from "@reapit/elements/core/bottom-bar";'],
    example: figma.code`<BottomBar>
      <BottomBar.MenuList>
        ${figma.helpers.react.renderChildren(children)}
        <BottomBar.MenuItem${figma.helpers.react.renderProp(
          "hasBadge",
          moreButton.hasBadge,
        )}${figma.helpers.react.renderProp(
          "icon",
          moreButton.icon,
        )}${figma.helpers.react.renderProp("label", moreButton.label)}>
          TODO: Add menu items
        </BottomBar.MenuItem>
      </BottomBar.MenuList>
    </BottomBar>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.properties.children(["*"]);

  template = {
    id: "BottomBar",
    imports: ['import { BottomBar } from "@reapit/elements/core/bottom-bar";'],
    example: figma.code`<BottomBar>
      <BottomBar.MenuList>${figma.helpers.react.renderChildren(children)}</BottomBar.MenuList>
    </BottomBar>`,
    metadata: { nestable: true },
  };
}

export default template;

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=15108-34603&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Main level") {
  const mainNav = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("Main nav");
    return {
      children:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.children
              .filter((child) => child.type === "INSTANCE")
              .map((child) => child.executeTemplate().example)
              .flat()
          : undefined,
    };
  })();
  const secondaryNav = figma.selectedInstance.getBoolean("Show secondary nav", {
    true: (function () {
      const nestedLayer2 = figma.selectedInstance.findInstance("Secondary nav");
      return {
        children:
          nestedLayer2.type !== "ERROR"
            ? nestedLayer2.children
                .filter((child) => child.type === "INSTANCE")
                .map((child) => child.executeTemplate().example)
                .flat()
            : undefined,
      };
    })(),
    false: { children: undefined },
  });
  const profileNav = figma.selectedInstance.getBoolean("Show user menu", {
    true: (function () {
      const nestedLayer3 = figma.selectedInstance.findInstance("User menu");
      return {
        children:
          nestedLayer3.type !== "ERROR"
            ? nestedLayer3.children
                .filter((child) => child.type === "INSTANCE")
                .map((child) => child.executeTemplate().example)
                .flat()
            : undefined,
      };
    })(),
    false: { children: undefined },
  });

  template = {
    id: "TopBar",
    imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
    example: figma.code`<TopBar.Menu>
      <TopBar.MenuContent>
        <TopBar.MenuMainNav>${figma.helpers.react.renderChildren(
          mainNav.children,
        )}</TopBar.MenuMainNav>
        <TopBar.MenuSecondaryNav>${figma.helpers.react.renderChildren(
          secondaryNav.children,
        )}</TopBar.MenuSecondaryNav>
        <TopBar.MenuProfileNav>${figma.helpers.react.renderChildren(
          profileNav.children,
        )}</TopBar.MenuProfileNav>
      </TopBar.MenuContent>
    </TopBar.Menu>`,
    metadata: { nestable: true },
  };
} else {
  const mainNav = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("Main nav");
    return {
      children:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.children
              .filter((child) => child.type === "INSTANCE")
              .map((child) => child.executeTemplate().example)
              .flat()
          : undefined,
    };
  })();
  const secondaryNav = figma.selectedInstance.getBoolean("Show secondary nav", {
    true: (function () {
      const nestedLayer2 = figma.selectedInstance.findInstance("Secondary nav");
      return {
        children:
          nestedLayer2.type !== "ERROR"
            ? nestedLayer2.children
                .filter((child) => child.type === "INSTANCE")
                .map((child) => child.executeTemplate().example)
                .flat()
            : undefined,
      };
    })(),
    false: { children: undefined },
  });
  const profileNav = figma.selectedInstance.getBoolean("Show user menu", {
    true: (function () {
      const nestedLayer3 = figma.selectedInstance.findInstance("User menu");
      return {
        children:
          nestedLayer3.type !== "ERROR"
            ? nestedLayer3.children
                .filter((child) => child.type === "INSTANCE")
                .map((child) => child.executeTemplate().example)
                .flat()
            : undefined,
      };
    })(),
    false: { children: undefined },
  });

  template = {
    id: "TopBar",
    imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
    example: figma.code`<TopBar.Menu>
      <TopBar.MenuContent>
        <TopBar.MenuMainNav>${figma.helpers.react.renderChildren(
          mainNav.children,
        )}</TopBar.MenuMainNav>
        <TopBar.MenuSecondaryNav>${figma.helpers.react.renderChildren(
          secondaryNav.children,
        )}</TopBar.MenuSecondaryNav>
        <TopBar.MenuProfileNav>${figma.helpers.react.renderChildren(
          profileNav.children,
        )}</TopBar.MenuProfileNav>
      </TopBar.MenuContent>
    </TopBar.Menu>`,
    metadata: { nestable: true },
  };
}

export default template;

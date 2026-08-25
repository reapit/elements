// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20264-38041&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/focused-layout/focused-layout.tsx
// component=FocusedLayout

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Breakpoints") === "XS") {
  const actions = figma.properties.children(["Button group"]);
  const background = figma.selectedInstance.getEnum("🎨 Style", {
    Light: "light",
    Dark: "dark",
  });
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const closeButton = figma.selectedInstance.getEnum("Type", {
    Simple: undefined,
    MultiStep: figma.selectedInstance.getInstanceSwap("Button")?.executeTemplate().example,
  });
  const pageTitle = figma.selectedInstance.getString("✏️ Page title");
  const logo = figma.properties.children(["Product logo"]);

  template = {
    id: "FocusedLayout",
    imports: ['import { FocusedLayout } from "@reapit/elements/core/focused-layout";'],
    example: figma.code`<FocusedLayout${figma.helpers.react.renderProp("background", background)}>
      <FocusedLayout.TopBar${figma.helpers.react.renderProp(
        "logo",
        logo,
      )}${figma.helpers.react.renderProp("title", pageTitle)}>
        ${figma.helpers.react.renderChildren(closeButton)}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>${figma.helpers.react.renderChildren(children)}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>${figma.helpers.react.renderChildren(
        actions,
      )}</FocusedLayout.BottomBar>
    </FocusedLayout>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Breakpoints") === "SM") {
  const actions = figma.properties.children(["Button group"]);
  const background = figma.selectedInstance.getEnum("🎨 Style", {
    Light: "light",
    Dark: "dark",
  });
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const closeButton = figma.selectedInstance.getEnum("Type", {
    Simple: undefined,
    MultiStep: figma.selectedInstance.getInstanceSwap("Button")?.executeTemplate().example,
  });
  const pageTitle = figma.selectedInstance.getString("✏️ Page title");
  const logo = figma.properties.children(["Product logo"]);

  template = {
    id: "FocusedLayout",
    imports: ['import { FocusedLayout } from "@reapit/elements/core/focused-layout";'],
    example: figma.code`<FocusedLayout${figma.helpers.react.renderProp("background", background)}>
      <FocusedLayout.TopBar${figma.helpers.react.renderProp(
        "logo",
        logo,
      )}${figma.helpers.react.renderProp("title", pageTitle)}>
        ${figma.helpers.react.renderChildren(closeButton)}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>${figma.helpers.react.renderChildren(children)}</FocusedLayout.Content>
      <FocusedLayout.BottomBar>${figma.helpers.react.renderChildren(
        actions,
      )}</FocusedLayout.BottomBar>
    </FocusedLayout>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Breakpoints") === "MD-2XL") {
  const actions = figma.properties.children(["Button group"]);
  const background = figma.selectedInstance.getEnum("🎨 Style", {
    Light: "light",
    Dark: "dark",
  });
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const pageTitle = figma.selectedInstance.getString("✏️ Page title");
  const logo = figma.properties.children(["Product logo"]);

  template = {
    id: "FocusedLayout",
    imports: ['import { FocusedLayout } from "@reapit/elements/core/focused-layout";'],
    example: figma.code`<FocusedLayout${figma.helpers.react.renderProp("background", background)}>
      <FocusedLayout.TopBar${figma.helpers.react.renderProp(
        "logo",
        logo,
      )}${figma.helpers.react.renderProp("title", pageTitle)}>
        ${figma.helpers.react.renderChildren(actions)}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>${figma.helpers.react.renderChildren(children)}</FocusedLayout.Content>
    </FocusedLayout>`,
    metadata: { nestable: true },
  };
} else {
  const actions = figma.properties.children(["Button group"]);
  const background = figma.selectedInstance.getEnum("🎨 Style", {
    Light: "light",
    Dark: "dark",
  });
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const pageTitle = figma.selectedInstance.getString("✏️ Page title");
  const logo = figma.properties.children(["Product logo"]);

  template = {
    id: "FocusedLayout",
    imports: ['import { FocusedLayout } from "@reapit/elements/core/focused-layout";'],
    example: figma.code`<FocusedLayout${figma.helpers.react.renderProp("background", background)}>
      <FocusedLayout.TopBar${figma.helpers.react.renderProp(
        "logo",
        logo,
      )}${figma.helpers.react.renderProp("title", pageTitle)}>
        ${figma.helpers.react.renderChildren(actions)}
      </FocusedLayout.TopBar>
      <FocusedLayout.Content>${figma.helpers.react.renderChildren(children)}</FocusedLayout.Content>
    </FocusedLayout>`,
    metadata: { nestable: true },
  };
}

export default template;

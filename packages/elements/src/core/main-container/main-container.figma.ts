// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=18898-22063&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/main-container/main-container.tsx
// component=MainContainer

import figma from "figma";

// Branch per variant combination.

let template;
if (figma.selectedInstance.getPropertyValue("Breakpoint") === "XS") {
  const layout = (function () {
    const nestedLayer37 = figma.selectedInstance.findInstance("Layout XS");
    return {
      children:
        nestedLayer37.type !== "ERROR"
          ? (function () {
              const slot = nestedLayer37.getSlot("Content slot");
              return slot
                ? slot.connectedInstances
                    .map((instance) => instance.executeTemplate().example)
                    .flat()
                : [];
            })()
          : undefined,
    };
  })();
  const size = figma.selectedInstance.getEnum("Container width", {
    Narrow: "narrow",
    Wide: "wide",
    Fluid: "fluid",
  });
  const hasNoBottomPadding = figma.selectedInstance.getBoolean("Bottom padding", {
    true: false,
    false: true,
  });
  const hasNoTopPadding = figma.selectedInstance.getBoolean("Top padding", {
    true: false,
    false: true,
  });

  template = {
    id: "MainContainer",
    imports: ['import { MainContainer } from "@reapit/elements/core/main-container";'],
    example: figma.code`<MainContainer${figma.helpers.react.renderProp(
      "hasNoBottomPadding",
      hasNoBottomPadding,
    )}${figma.helpers.react.renderProp(
      "hasNoTopPadding",
      hasNoTopPadding,
    )}${figma.helpers.react.renderProp("size", size)} template="single-column">
      ${figma.helpers.react.renderChildren(layout.children)}
    </MainContainer>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Breakpoint") === "SM") {
  const layout = (function () {
    const nestedLayer38 = figma.selectedInstance.findInstance("Layout SM");
    return {
      children:
        nestedLayer38.type !== "ERROR"
          ? (function () {
              const slot = nestedLayer38.getSlot("Content slot");
              return slot
                ? slot.connectedInstances
                    .map((instance) => instance.executeTemplate().example)
                    .flat()
                : [];
            })()
          : undefined,
      template:
        nestedLayer38.type !== "ERROR"
          ? nestedLayer38.getEnum("Variant", {
              "1": "single-column",
              "1-1": "two-columns-symmetrical",
            })
          : undefined,
    };
  })();
  const hasNoBottomPadding = figma.selectedInstance.getBoolean("Bottom padding", {
    true: false,
    false: true,
  });
  const hasNoTopPadding = figma.selectedInstance.getBoolean("Top padding", {
    true: false,
    false: true,
  });
  const size = figma.selectedInstance.getEnum("Container width", {
    Narrow: "narrow",
    Wide: "wide",
    Fluid: "fluid",
  });

  template = {
    id: "MainContainer",
    imports: ['import { MainContainer } from "@reapit/elements/core/main-container";'],
    example: figma.code`<MainContainer${figma.helpers.react.renderProp(
      "hasNoBottomPadding",
      hasNoBottomPadding,
    )}${figma.helpers.react.renderProp(
      "hasNoTopPadding",
      hasNoTopPadding,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp("template", layout.template)}>
      ${figma.helpers.react.renderChildren(layout.children)}
    </MainContainer>`,
    metadata: { nestable: true },
  };
} else {
  const layout = (function () {
    const nestedLayer39 = figma.selectedInstance.findInstance("Layout MD-2XL");
    return {
      children:
        nestedLayer39.type !== "ERROR"
          ? (function () {
              const slot = nestedLayer39.getSlot("Content slot");
              return slot
                ? slot.connectedInstances
                    .map((instance) => instance.executeTemplate().example)
                    .flat()
                : [];
            })()
          : undefined,
      template:
        nestedLayer39.type !== "ERROR"
          ? nestedLayer39.getEnum("Variant", {
              "1": "single-column",
              "1-1": "two-columns-symmetrical",
              "2-1": "two-columns-asymmetrical-start",
              "1-2": "two-columns-asymmetrical-end",
              "1-1-1": "three-columns",
            })
          : undefined,
    };
  })();
  const hasNoBottomPadding = figma.selectedInstance.getBoolean("Bottom padding", {
    true: false,
    false: true,
  });
  const hasNoTopPadding = figma.selectedInstance.getBoolean("Top padding", {
    true: false,
    false: true,
  });
  const size = figma.selectedInstance.getEnum("Container width", {
    Narrow: "narrow",
    Wide: "wide",
    Fluid: "fluid",
  });

  template = {
    id: "MainContainer",
    imports: ['import { MainContainer } from "@reapit/elements/core/main-container";'],
    example: figma.code`<MainContainer${figma.helpers.react.renderProp(
      "hasNoBottomPadding",
      hasNoBottomPadding,
    )}${figma.helpers.react.renderProp(
      "hasNoTopPadding",
      hasNoTopPadding,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp("template", layout.template)}>
      ${figma.helpers.react.renderChildren(layout.children)}
    </MainContainer>`,
    metadata: { nestable: true },
  };
}

export default template;

// url=<EMPTY_STATE_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/empty-state/empty-state.tsx
// component=EmptyState

import figma from "figma";

// Branch per variant combination.

let template;
if (
  figma.selectedInstance.getPropertyValue("Show title") === false &&
  figma.selectedInstance.getPropertyValue("Show description") === false
) {
  const actions = figma.selectedInstance.getBoolean("Show actions", {
    true: figma.properties.children(["Button group"]),
    false: undefined,
  });
  const background = figma.selectedInstance.getEnum("Background", {
    White: "white",
    Grey: "neutral-lightest",
    Transparent: "transparent",
  });
  const illustration = figma.selectedInstance.getBoolean("Show illustration", {
    true: (function () {
      const slot = figma.properties.slot("↳ Illustration slot");
      return slot
        ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
        : [];
    })(),
    false: undefined,
  });
  const size = figma.selectedInstance.getEnum("Size", {
    Large: "large",
    Small: "small",
  });

  template = {
    id: "EmptyState",
    imports: ['import { EmptyState } from "@reapit/elements/core/empty-state";'],
    example: figma.code`<EmptyState${figma.helpers.react.renderProp(
      "background",
      background,
    )}${figma.helpers.react.renderProp("size", size)}>
      ${figma.helpers.react.renderChildren(illustration)}
      ${figma.helpers.react.renderChildren(actions)}
    </EmptyState>`,
    metadata: { nestable: true },
  };
} else {
  const actions = figma.selectedInstance.getBoolean("Show actions", {
    true: figma.properties.children(["Button group"]),
    false: undefined,
  });
  const background = figma.selectedInstance.getEnum("Background", {
    White: "white",
    Grey: "neutral-lightest",
    Transparent: "transparent",
  });
  const illustration = figma.selectedInstance.getBoolean("Show illustration", {
    true: (function () {
      const slot = figma.properties.slot("↳ Illustration slot");
      return slot
        ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
        : [];
    })(),
    false: undefined,
  });
  const secondaryText = figma.selectedInstance.getBoolean("Show description", {
    true: figma.selectedInstance.getString("↳ Description"),
    false: undefined,
  });
  const size = figma.selectedInstance.getEnum("Size", {
    Large: "large",
    Small: "small",
  });
  const title = figma.selectedInstance.getBoolean("Show title", {
    true: figma.selectedInstance.getString("↳ Title"),
    false: undefined,
  });

  template = {
    id: "EmptyState",
    imports: ['import { EmptyState } from "@reapit/elements/core/empty-state";'],
    example: figma.code`<EmptyState${figma.helpers.react.renderProp(
      "background",
      background,
    )}${figma.helpers.react.renderProp("size", size)}>
      ${figma.helpers.react.renderChildren(illustration)}
      <EmptyState.Description${figma.helpers.react.renderProp("secondaryText", secondaryText)}>
        ${figma.helpers.react.renderChildren(title)}
      </EmptyState.Description>
      ${figma.helpers.react.renderChildren(actions)}
    </EmptyState>`,
    metadata: { nestable: true },
  };
}

export default template;

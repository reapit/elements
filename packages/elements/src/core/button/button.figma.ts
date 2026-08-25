// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=13904-19759&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/button/button.tsx
// component=Button

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Type") === "Text + Icon") {
  const children = figma.selectedInstance.getString("Label");
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const hasNoPadding = figma.selectedInstance.getBoolean("Remove padding");
  const iconLeft = figma.selectedInstance.getBoolean("Icon left", {
    true: figma.selectedInstance.getInstanceSwap("Icon L")?.executeTemplate().example,
    false: undefined,
  });
  const iconRight = figma.selectedInstance.getBoolean("Icon right", {
    true: figma.selectedInstance.getInstanceSwap("Icon R")?.executeTemplate().example,
    false: undefined,
  });
  const isDestructive = figma.selectedInstance.getBoolean("Destructive");
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
  });
  const useAIStyle = figma.selectedInstance.getBoolean("Ai style");
  const useLinkStyle = figma.selectedInstance.getBoolean("Link style");
  const variant = figma.selectedInstance.getEnum("Variant", {
    Primary: "primary",
    Secondary: "secondary",
    Tertiary: "tertiary",
  });

  template = {
    id: "Button",
    imports: ['import { Button } from "@reapit/elements/core/button";'],
    example: figma.code`<Button${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp(
      "hasNoPadding",
      hasNoPadding,
    )}${figma.helpers.react.renderProp("iconLeft", iconLeft)}${figma.helpers.react.renderProp(
      "iconRight",
      iconRight,
    )}${figma.helpers.react.renderProp(
      "isDestructive",
      isDestructive,
    )}${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp(
      "useAIStyle",
      useAIStyle,
    )}${figma.helpers.react.renderProp(
      "useLinkStyle",
      useLinkStyle,
    )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(children)}
    </Button>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon only") {
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const hasNoPadding = figma.selectedInstance.getBoolean("Remove padding");
  const iconLeft = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;
  const isDestructive = figma.selectedInstance.getBoolean("Destructive");
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
  });
  const useAIStyle = figma.selectedInstance.getBoolean("Ai style");
  const useLinkStyle = figma.selectedInstance.getBoolean("Link style");
  const variant = figma.selectedInstance.getEnum("Variant", {
    Primary: "primary",
    Secondary: "secondary",
    Tertiary: "tertiary",
  });

  template = {
    id: "Button",
    imports: ['import { Button } from "@reapit/elements/core/button";'],
    example: figma.code`// NOTE: Use AnchorButton when needing to navigate
<Button${figma.helpers.react.renderProp("disabled", disabled)}${figma.helpers.react.renderProp(
      "hasNoPadding",
      hasNoPadding,
    )}${figma.helpers.react.renderProp("iconLeft", iconLeft)}${figma.helpers.react.renderProp(
      "isDestructive",
      isDestructive,
    )}${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp(
      "useAIStyle",
      useAIStyle,
    )}${figma.helpers.react.renderProp(
      "useLinkStyle",
      useLinkStyle,
    )}${figma.helpers.react.renderProp("variant", variant)}/>`,
    metadata: { nestable: true },
  };
} else {
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  });
  const hasNoPadding = figma.selectedInstance.getBoolean("Remove padding");
  const iconLeft = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;
  const isDestructive = figma.selectedInstance.getBoolean("Destructive");
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
  });
  const useAIStyle = figma.selectedInstance.getBoolean("Ai style");
  const useLinkStyle = figma.selectedInstance.getBoolean("Link style");
  const variant = figma.selectedInstance.getEnum("Variant", {
    Primary: "primary",
    Secondary: "secondary",
    Tertiary: "tertiary",
  });

  template = {
    id: "Button",
    imports: ['import { Button } from "@reapit/elements/core/button";'],
    example: figma.code`// NOTE: Use AnchorButton when needing to navigate
<Button${figma.helpers.react.renderProp("disabled", disabled)}${figma.helpers.react.renderProp(
      "hasNoPadding",
      hasNoPadding,
    )}${figma.helpers.react.renderProp("iconLeft", iconLeft)}${figma.helpers.react.renderProp(
      "isDestructive",
      isDestructive,
    )}${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp(
      "useAIStyle",
      useAIStyle,
    )}${figma.helpers.react.renderProp(
      "useLinkStyle",
      useLinkStyle,
    )}${figma.helpers.react.renderProp("variant", variant)}/>`,
    metadata: { nestable: true },
  };
}

export default template;

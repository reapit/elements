// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=1454-7529&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/badge/badge.tsx
// component=Badge

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Label") === true) {
  const children = figma.selectedInstance.getString("Label text");
  const colour = figma.selectedInstance.getEnum("Style", {
    Neutral: "neutral",
    Success: "success",
    Pending: "pending",
    Warning: "warning",
    Danger: "danger",
    Inactive: "inactive",
    "Accent 1": "accent_1",
    "Accent 2": "accent_2",
  });
  const iconLeft = figma.selectedInstance.getInstanceSwap("Icon left")?.executeTemplate().example;
  const iconRight = figma.selectedInstance.getInstanceSwap("Icon right")?.executeTemplate().example;
  const variant = figma.selectedInstance.getEnum("Variant", {
    Default: "default",
    Reversed: "reversed",
  });

  template = {
    id: "Badge",
    imports: ['import { Badge } from "@reapit/elements/core/badge";'],
    example: figma.code`<Badge${figma.helpers.react.renderProp(
      "colour",
      colour,
    )}${figma.helpers.react.renderProp("iconLeft", iconLeft)}${figma.helpers.react.renderProp(
      "iconRight",
      iconRight,
    )}${figma.helpers.react.renderProp(
      "variant",
      variant,
    )}>${figma.helpers.react.renderChildren(children)}</Badge>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Label") === false) {
  const colour = figma.selectedInstance.getEnum("Style", {
    Neutral: "neutral",
    Success: "success",
    Pending: "pending",
    Warning: "warning",
    Danger: "danger",
    Inactive: "inactive",
    "Accent 1": "accent_1",
    "Accent 2": "accent_2",
  });
  const iconLeft = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;
  const variant = figma.selectedInstance.getEnum("Variant", {
    Default: "default",
    Reversed: "reversed",
  });

  template = {
    id: "Badge",
    imports: ['import { Badge } from "@reapit/elements/core/badge";'],
    example: figma.code`<Badge aria-label="Label"${figma.helpers.react.renderProp(
      "colour",
      colour,
    )}${figma.helpers.react.renderProp(
      "iconLeft",
      iconLeft,
    )}${figma.helpers.react.renderProp("variant", variant)}/>`,
    metadata: { nestable: true },
  };
} else {
  const colour = figma.selectedInstance.getEnum("Style", {
    Neutral: "neutral",
    Success: "success",
    Pending: "pending",
    Warning: "warning",
    Danger: "danger",
    Inactive: "inactive",
    "Accent 1": "accent_1",
    "Accent 2": "accent_2",
  });
  const iconLeft = figma.selectedInstance.getInstanceSwap("Icon")?.executeTemplate().example;
  const variant = figma.selectedInstance.getEnum("Variant", {
    Default: "default",
    Reversed: "reversed",
  });

  template = {
    id: "Badge",
    imports: ['import { Badge } from "@reapit/elements/core/badge";'],
    example: figma.code`<Badge aria-label="Label"${figma.helpers.react.renderProp(
      "colour",
      colour,
    )}${figma.helpers.react.renderProp(
      "iconLeft",
      iconLeft,
    )}${figma.helpers.react.renderProp("variant", variant)}/>`,
    metadata: { nestable: true },
  };
}

export default template;

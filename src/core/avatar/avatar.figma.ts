// url=<AVATAR_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/avatar/avatar.tsx
// component=Avatar

// NOTE: This connects the internal variant component (node 21366:39564) that drives the initials/icon/image/size/
// shape/colour/border matrix, not the outer `.Avatar` wrapper (node 21366:38780) that adds interactivity. The outer
// wrapper only exposes `Interactive`/`State`, which map to `AvatarButton`/`AvatarAnchor` rather than `Avatar` itself.
// That mapping needs a follow-up pass once the wrapper's publish status and exact behaviour are confirmed
// interactively in Figma.

import figma from "figma";

const colour = figma.selectedInstance.getEnum("is Primary", {
  True: "primary",
  False: "default",
});
const shape = figma.selectedInstance.getEnum("Shape", {
  Circle: "circle",
  Square: "square",
});
const size = figma.selectedInstance.getEnum("Size", {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
});
// NOTE: the source Figma file only exposes a boolean "has Border" property so far, mapped here to the `white`
// variant of `borderColour`. This should be revisited once Design adds a border colour property upstream.
const borderColour = figma.selectedInstance.getBoolean("has Border")
  ? "--colour-border-white"
  : undefined;
const hasIcon = figma.selectedInstance.getBoolean("has Icon");
const hasImage = figma.selectedInstance.getBoolean("has Image");

// NOTE: the Circle and Square variants bind their initials text to differently-named properties in the source
// Figma file ("↳ Initials" vs "↳ Initial"). This is a quirk of the file, not an intentional distinction.
const initials =
  shape === "square"
    ? figma.selectedInstance.getString("↳ Initial")
    : figma.selectedInstance.getString("↳ Initials");
const icon = figma.selectedInstance.getInstanceSwap("↳ Icon")?.executeTemplate().example;

let content;
if (hasIcon) {
  content = icon;
} else if (hasImage) {
  content = figma.code`{/* TODO: provide an image \`src\` */}`;
} else {
  content = initials;
}

export default {
  id: "Avatar",
  imports: ['import { Avatar } from "@reapit/elements/core/avatar";'],
  example: figma.code`<Avatar${figma.helpers.react.renderProp(
    "colour",
    colour,
  )}${figma.helpers.react.renderProp(
    "shape",
    shape,
  )}${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp(
    "borderColour",
    borderColour,
  )}>
      ${content}
    </Avatar>`,
  metadata: { nestable: true },
};

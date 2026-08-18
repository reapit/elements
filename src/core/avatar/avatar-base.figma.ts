// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=21366-39564&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/avatar/avatar-base.tsx
// component=AvatarBase

// NOTE: `AvatarBase` is an internal implementation detail (not exported for direct use), so this template
// renders only the avatar's inner content (initials/icon/image placeholder) rather than a wrapping component.
// The `colour`/`shape`/`size`/`borderColour` values are surfaced via `metadata.props` so parent templates
// (`Avatar`, `AvatarButton`, `AvatarAnchor`) can pull them in when composing their own wrapping tag.

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
  id: "AvatarBase",
  example: figma.code`${content}`,
  metadata: {
    nestable: true,
    props: { colour, shape, size, borderColour },
  },
};

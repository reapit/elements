// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Elements-DS?node-id=21366-38780&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/avatar/avatar.tsx
// component=Avatar

// NOTE: the "Interactive" variant exists in Figma to show hover/disabled states, which only `AvatarButton`/
// `AvatarAnchor` provide (a plain `Avatar` has no hover/disabled styling). So `Interactive=True` maps to
// `AvatarButton` here rather than `Avatar`. Swap to `AvatarAnchor` (and add a real `href`) if this avatar
// should navigate somewhere instead of triggering an in-page action — the Figma file has no property to
// distinguish the two, since both render identically.
//
// NOTE: `aria-label` is always included, even though it's technically optional on `Avatar` (but required on
// `AvatarButton`/`AvatarAnchor`), since it should always be provided in practice. The Figma file has no
// property to source the real accessible name from, so a `TODO` placeholder is used instead.

import figma from "figma";

const isInteractive = figma.selectedInstance.getBoolean("Interactive");
const isDisabled = figma.selectedInstance.getPropertyValue("State") === "Disabled";

const avatarProps = figma.selectedInstance.findInstance(".Avatar props");
let content;
let colour;
let shape;
let size;
let borderColour;
if (avatarProps.type === "INSTANCE") {
  const { example, metadata } = avatarProps.executeTemplate();
  content = example;
  ({ colour, shape, size, borderColour } = metadata?.props ?? {});
}

const baseProps = figma.code`${figma.helpers.react.renderProp(
  "colour",
  colour,
)}${figma.helpers.react.renderProp("shape", shape)}${figma.helpers.react.renderProp(
  "size",
  size,
)}${figma.helpers.react.renderProp("borderColour", borderColour)}`;

let template;
if (isInteractive) {
  template = {
    id: "Avatar",
    imports: ['import { AvatarButton } from "@reapit/elements/core/avatar";'],
    example: figma.code`<AvatarButton${baseProps} aria-label="TODO: Full name"${figma.helpers.react.renderProp(
      "disabled",
      isDisabled ? true : undefined,
    )}>
      ${content}
    </AvatarButton>`,
    metadata: { nestable: true },
  };
} else {
  template = {
    id: "Avatar",
    imports: ['import { Avatar } from "@reapit/elements/core/avatar";'],
    example: figma.code`<Avatar${baseProps} aria-label="TODO: Full name">
      ${content}
    </Avatar>`,
    metadata: { nestable: true },
  };
}

export default template;

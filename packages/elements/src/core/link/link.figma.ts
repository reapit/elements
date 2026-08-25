// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=11867-66681&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/link/link.tsx
// component=Link

import figma from "figma";

const children = figma.selectedInstance.getString("Link text");
const isQuiet = figma.selectedInstance.getBoolean("Quiet");
const size = figma.selectedInstance.getEnum("Size", {
  base: "base",
  sm: "sm",
  xs: "xs",
});
const variant = figma.selectedInstance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
  Reversed: "reversed",
});

export default {
  id: "Link",
  imports: ['import { Link } from "@reapit/elements/core/link";'],
  example: figma.code`<Link href="#replace-me"${figma.helpers.react.renderProp(
    "isQuiet",
    isQuiet,
  )}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("variant", variant)}>
      ${figma.helpers.react.renderChildren(children)}
    </Link>`,
  metadata: { nestable: true },
};

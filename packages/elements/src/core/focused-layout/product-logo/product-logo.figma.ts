// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=14722-52638&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/focused-layout/focused-layout.tsx
// component=FocusedLayout.ProductLogo

import figma from "figma";

const product = figma.selectedInstance.getEnum("Product logo", {
  Reapit: "Reapit",
  Autoresponder: "Autoresponder",
  KeyWhere: "KeyWhere",
  "Lettings BDM": "Reapit Lettings BDM",
  "Reapit Forms": "Reapit Forms",
  "Reapit Lettings": "Reapit Lettings",
  "Reapit PM": "Reapit PM",
  "Reapit Proposals": "Reapit Proposals",
  "Reapit Sales": "Reapit Sales",
  "Reapit Websites": "Reapit Websites",
  "Reapit Verify": "Reapit Verify",
});

export default {
  id: "FocusedLayout.ProductLogo",
  imports: ['import { FocusedLayout } from "@reapit/elements/core/focused-layout";'],
  example: figma.code`<FocusedLayout.ProductLogo${figma.helpers.react.renderProp(
    "product",
    product,
  )}/>`,
  metadata: { nestable: true },
};

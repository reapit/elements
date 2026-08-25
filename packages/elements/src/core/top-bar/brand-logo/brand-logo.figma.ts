// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12158-7298&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.BrandLogo

import figma from "figma";

const brand = figma.selectedInstance.getEnum("Brand", {
  Reapit: "Reapit",
  "Console Owner": "Console Owner",
  "Console Pay": "Console Pay",
  "Console Tenant": "Console Tenant",
  "Reapit Connect": "Reapit Connect",
  "Reapit Projector": "Reapit Projector",
  "Reapit Sales": "Reapit Sales",
  "Reapit Lettings": "Reapit Lettings",
  "Reapit PM": "Reapit PM",
  "PM Demo": "PM Demo",
  "PM Sales": "PM Sales",
  "PM Inspect": "PM Inspect",
  "Reapit Forms": "Reapit Forms",
  "Reapit Websites": "Reapit Websites",
  "Reapit Proposals": "Reapit Proposals",
  KeyWhere: "KeyWhere",
  "Auto Responder": "Auto Responder",
});

export default {
  id: "TopBar.BrandLogo",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.BrandLogo${figma.helpers.react.renderProp("appName", brand)}/>`,
  metadata: { nestable: true },
};

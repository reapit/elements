// url=<TOP_BAR_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar

import figma from "figma";

const appSwitcher = figma.selectedInstance.getBoolean("App switcher", {
  true: figma.helpers.react.jsxElement(
    "<AppSwitcher>TODO: add app switcher menu content</AppSwitcher>",
  ),
  false: undefined,
});
const avatarButton = figma.properties.children(["Avatar button"]);
const brandLogo = figma.properties.children(["Brand logo"]);
const mainNav = figma.properties.children(["Main nav"]);
const search = figma.selectedInstance.getBoolean("Search", {
  true: figma.helpers.react.jsxElement(
    '<TopBar.NavSearch\n          button={<TopBar.NavSearchButton onClick={() => {}} />}\n          iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => {}} />}\n        />',
  ),
  false: undefined,
});
const secondaryNav = figma.properties.children(["Secondary nav"]);

export default {
  id: "TopBar",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar${figma.helpers.react.renderProp(
    "appSwitcher",
    appSwitcher,
  )}${figma.helpers.react.renderProp("avatar", avatarButton)}${figma.helpers.react.renderProp(
    "logo",
    brandLogo,
  )}${figma.helpers.react.renderProp("mainNav", mainNav)}${figma.helpers.react.renderProp(
    "search",
    search,
  )}${figma.helpers.react.renderProp("secondaryNav", secondaryNav)}/>`,
  metadata: { nestable: true },
};

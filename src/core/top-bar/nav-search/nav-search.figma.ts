// url=<TOP_BAR_NAV_SEARCH_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.NavSearch

import figma from "figma";

export default {
  id: "TopBar.NavSearch",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.NavSearch button={<TopBar.NavSearchButton onClick={() => { }}/>} iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => { }}/>}/>`,
};

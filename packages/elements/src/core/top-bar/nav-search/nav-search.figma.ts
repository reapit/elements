// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=12148-34981&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/top-bar/top-bar.tsx
// component=TopBar.NavSearch

import figma from "figma";

export default {
  id: "TopBar.NavSearch",
  imports: ['import { TopBar } from "@reapit/elements/core/top-bar";'],
  example: figma.code`<TopBar.NavSearch button={<TopBar.NavSearchButton onClick={() => { }}/>} iconItem={<TopBar.NavSearchIconItem aria-label="Search" onClick={() => { }}/>}/>`,
};

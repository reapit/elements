import figma from "@figma/code-connect";

import { TopBar } from "../../top-bar";

figma.connect(TopBar, "<TOP_BAR_MENU_ITEM_URL>", {
  variant: { Type: "Simple" },
  props: {
    item: figma.nestedProps("Top item", {
      hasBadge: figma.boolean("Notification badge"),
      label: figma.string("Label"),
    }),
  },
  example: (props) => (
    <TopBar.MenuItem aria-current={false} hasBadge={props.item.hasBadge} href="<REPLACE_ME>">
      {props.item.label}
    </TopBar.MenuItem>
  ),
});

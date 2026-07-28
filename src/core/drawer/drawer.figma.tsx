import figma from "@figma/code-connect";

import { Drawer } from "./drawer";

figma.connect(Drawer, "<DRAWER_URL>", {
  variant: { Variant: "Simple" },
  props: {
    children: figma.slot("Content slot").connectedInstances,
    overline: figma.string("Overline"),
    supplementaryInfo: figma.children("Supplementary info"),
    tabs: figma.children("Tabs"),
    title: figma.string("Drawer title"),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header
        action={<Drawer.HeaderCloseButton />}
        overline={props.overline}
        supplementaryInfo={props.supplementaryInfo}
        tabs={props.tabs}
      >
        {props.title}
      </Drawer.Header>
      <Drawer.Body>{props.children}</Drawer.Body>
    </Drawer>
  ),
});

figma.connect(Drawer, "<DRAWER_URL>", {
  variant: { Variant: "With footer" },
  props: {
    children: figma.slot("Content slot").connectedInstances,
    footer: figma.children("Button group"),
    overline: figma.string("Overline"),
    supplementaryInfo: figma.children("Supplementary info"),
    title: figma.string("Drawer title"),
  },
  example: (props) => (
    <Drawer>
      <Drawer.Header overline={props.overline} supplementaryInfo={props.supplementaryInfo}>
        {props.title}
      </Drawer.Header>
      <Drawer.Body>{props.children}</Drawer.Body>
      <Drawer.Footer>{props.footer}</Drawer.Footer>
    </Drawer>
  ),
});

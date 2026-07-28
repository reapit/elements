import figma from "@figma/code-connect";

import { PageLayout } from "./page-layout";

figma.connect(PageLayout, "<PAGE_LAYOUT_URL>", {
  variant: { "Show bottom bar": false },
  props: {
    children: figma.slot("Content slot").connectedInstances,
    officeSwitcher: figma.children("Office switcher"),
    pageHeader: figma.children("Page header"),
    sideBar: figma.children("Side bar"),
    topBar: figma.children("Top bar"),
  },
  example: (props) => (
    <PageLayout id="todo-replace-me" scroll="body">
      <PageLayout.TopBarRegion>
        {props.topBar}
        {props.officeSwitcher}
      </PageLayout.TopBarRegion>
      <PageLayout.SideBarRegion>{props.sideBar}</PageLayout.SideBarRegion>
      <PageLayout.BodyRegion>
        {props.pageHeader}
        {props.children}
      </PageLayout.BodyRegion>
    </PageLayout>
  ),
});

figma.connect(PageLayout, "<PAGE_LAYOUT_URL>", {
  variant: { "Show bottom bar": true },
  props: {
    children: figma.slot("Content slot").connectedInstances,
    pageHeader: figma.children("Page header"),
    bottomBar: figma.children("Bottom bar"),
  },
  example: (props) => (
    <PageLayout id="todo-replace-me" scroll="self">
      <PageLayout.BodyRegion>
        {props.pageHeader}
        {props.children}
      </PageLayout.BodyRegion>
      <PageLayout.BottomBarRegion>{props.bottomBar}</PageLayout.BottomBarRegion>
    </PageLayout>
  ),
});

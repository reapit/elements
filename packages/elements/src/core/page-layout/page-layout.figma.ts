// url=<PAGE_LAYOUT_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-layout/page-layout.tsx
// component=PageLayout

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Show bottom bar") === false) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const officeSwitcher = figma.properties.children(["Office switcher"]);
  const pageHeader = figma.properties.children(["Page header"]);
  const sideBar = figma.properties.children(["Side bar"]);
  const topBar = figma.properties.children(["Top bar"]);

  template = {
    id: "PageLayout",
    imports: ['import { PageLayout } from "@reapit/elements/core/page-layout";'],
    example: figma.code`<PageLayout id="todo-replace-me" scroll="body">
      <PageLayout.TopBarRegion>
        ${figma.helpers.react.renderChildren(topBar)}
        ${figma.helpers.react.renderChildren(officeSwitcher)}
      </PageLayout.TopBarRegion>
      <PageLayout.SideBarRegion>${figma.helpers.react.renderChildren(
        sideBar,
      )}</PageLayout.SideBarRegion>
      <PageLayout.BodyRegion>
        ${figma.helpers.react.renderChildren(pageHeader)}
        ${figma.helpers.react.renderChildren(children)}
      </PageLayout.BodyRegion>
    </PageLayout>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Show bottom bar") === true) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const pageHeader = figma.properties.children(["Page header"]);
  const bottomBar = figma.properties.children(["Bottom bar"]);

  template = {
    id: "PageLayout",
    imports: ['import { PageLayout } from "@reapit/elements/core/page-layout";'],
    example: figma.code`<PageLayout id="todo-replace-me" scroll="self">
      <PageLayout.BodyRegion>
        ${figma.helpers.react.renderChildren(pageHeader)}
        ${figma.helpers.react.renderChildren(children)}
      </PageLayout.BodyRegion>
      <PageLayout.BottomBarRegion>${figma.helpers.react.renderChildren(
        bottomBar,
      )}</PageLayout.BottomBarRegion>
    </PageLayout>`,
    metadata: { nestable: true },
  };
} else {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const pageHeader = figma.properties.children(["Page header"]);
  const bottomBar = figma.properties.children(["Bottom bar"]);

  template = {
    id: "PageLayout",
    imports: ['import { PageLayout } from "@reapit/elements/core/page-layout";'],
    example: figma.code`<PageLayout id="todo-replace-me" scroll="self">
      <PageLayout.BodyRegion>
        ${figma.helpers.react.renderChildren(pageHeader)}
        ${figma.helpers.react.renderChildren(children)}
      </PageLayout.BodyRegion>
      <PageLayout.BottomBarRegion>${figma.helpers.react.renderChildren(
        bottomBar,
      )}</PageLayout.BottomBarRegion>
    </PageLayout>`,
    metadata: { nestable: true },
  };
}

export default template;

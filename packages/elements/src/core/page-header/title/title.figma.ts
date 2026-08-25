// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20266-46437&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/page-header/page-header.tsx
// component=PageHeader.Title

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Show additional info") === true) {
  const actions = figma.properties.children(["Button group"]);
  const badge = figma.properties.children(["Badge"]);
  const icon = figma.properties.children(["Icon"]);
  const tags = figma.properties.children(["Tag group"]);
  const title = figma.selectedInstance.getString("Page title");

  template = {
    id: "PageHeader.Title",
    imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
    example: figma.code`<PageHeader.Title${figma.helpers.react.renderProp(
      "actions",
      actions,
    )} additionalInfo={<>
          ${figma.helpers.react.renderChildren(tags)}
          ${figma.helpers.react.renderChildren(badge)}
          ${figma.helpers.react.renderChildren(icon)}
        </>}>
      ${figma.helpers.react.renderChildren(title)}
    </PageHeader.Title>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Show additional info") === false) {
  const actions = figma.properties.children(["Button group"]);
  const title = figma.selectedInstance.getString("Page title");

  template = {
    id: "PageHeader.Title",
    imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
    example: figma.code`<PageHeader.Title${figma.helpers.react.renderProp(
      "actions",
      actions,
    )}>${figma.helpers.react.renderChildren(title)}</PageHeader.Title>`,
    metadata: { nestable: true },
  };
} else {
  const actions = figma.properties.children(["Button group"]);
  const title = figma.selectedInstance.getString("Page title");

  template = {
    id: "PageHeader.Title",
    imports: ['import { PageHeader } from "@reapit/elements/core/page-header";'],
    example: figma.code`<PageHeader.Title${figma.helpers.react.renderProp(
      "actions",
      actions,
    )}>${figma.helpers.react.renderChildren(title)}</PageHeader.Title>`,
    metadata: { nestable: true },
  };
}

export default template;

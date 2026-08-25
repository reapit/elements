// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=20264-36180&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/drawer/drawer.tsx
// component=Drawer

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Simple") {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const overline = figma.selectedInstance.getString("Overline");
  const supplementaryInfo = figma.properties.children(["Supplementary info"]);
  const tabs = figma.properties.children(["Tabs"]);
  const title = figma.selectedInstance.getString("Drawer title");

  template = {
    id: "Drawer",
    imports: ['import { Drawer } from "@reapit/elements/core/drawer";'],
    example: figma.code`<Drawer>
      <Drawer.Header action={<Drawer.HeaderCloseButton />}${figma.helpers.react.renderProp(
        "overline",
        overline,
      )}${figma.helpers.react.renderProp(
        "supplementaryInfo",
        supplementaryInfo,
      )}${figma.helpers.react.renderProp("tabs", tabs)}>
        ${figma.helpers.react.renderChildren(title)}
      </Drawer.Header>
      <Drawer.Body>${figma.helpers.react.renderChildren(children)}</Drawer.Body>
    </Drawer>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "With footer") {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.properties.children(["Button group"]);
  const overline = figma.selectedInstance.getString("Overline");
  const supplementaryInfo = figma.properties.children(["Supplementary info"]);
  const title = figma.selectedInstance.getString("Drawer title");

  template = {
    id: "Drawer",
    imports: ['import { Drawer } from "@reapit/elements/core/drawer";'],
    example: figma.code`<Drawer>
      <Drawer.Header${figma.helpers.react.renderProp(
        "overline",
        overline,
      )}${figma.helpers.react.renderProp("supplementaryInfo", supplementaryInfo)}>
        ${figma.helpers.react.renderChildren(title)}
      </Drawer.Header>
      <Drawer.Body>${figma.helpers.react.renderChildren(children)}</Drawer.Body>
      <Drawer.Footer>${figma.helpers.react.renderChildren(footer)}</Drawer.Footer>
    </Drawer>`,
    metadata: { nestable: true },
  };
} else {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.properties.children(["Button group"]);
  const overline = figma.selectedInstance.getString("Overline");
  const supplementaryInfo = figma.properties.children(["Supplementary info"]);
  const title = figma.selectedInstance.getString("Drawer title");

  template = {
    id: "Drawer",
    imports: ['import { Drawer } from "@reapit/elements/core/drawer";'],
    example: figma.code`<Drawer>
      <Drawer.Header${figma.helpers.react.renderProp(
        "overline",
        overline,
      )}${figma.helpers.react.renderProp("supplementaryInfo", supplementaryInfo)}>
        ${figma.helpers.react.renderChildren(title)}
      </Drawer.Header>
      <Drawer.Body>${figma.helpers.react.renderChildren(children)}</Drawer.Body>
      <Drawer.Footer>${figma.helpers.react.renderChildren(footer)}</Drawer.Footer>
    </Drawer>`,
    metadata: { nestable: true },
  };
}

export default template;

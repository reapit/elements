// url=<DIALOG_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/dialog/dialog.tsx
// component=Dialog

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (
  figma.selectedInstance.getPropertyValue("Footer") === true &&
  figma.selectedInstance.getPropertyValue("Show title") === true
) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.properties.children(["Button group"]);
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
    "Full screen": "full-screen",
  });
  const title = figma.selectedInstance.findText("Title").__render__();

  template = {
    id: "Dialog",
    imports: ['import { Dialog } from "@reapit/elements/core/dialog";'],
    example: figma.code`<Dialog${figma.helpers.react.renderProp("size", size)}>
      <Dialog.Header>${figma.helpers.react.renderChildren(title)}</Dialog.Header>
      <Dialog.Body>${figma.helpers.react.renderChildren(children)}</Dialog.Body>
      <Dialog.Footer>${figma.helpers.react.renderChildren(footer)}</Dialog.Footer>
    </Dialog>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Footer") === true &&
  figma.selectedInstance.getPropertyValue("Show title") === false
) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.properties.children(["Button group"]);
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
    "Full screen": "full-screen",
  });

  template = {
    id: "Dialog",
    imports: ['import { Dialog } from "@reapit/elements/core/dialog";'],
    example: figma.code`<Dialog${figma.helpers.react.renderProp("size", size)}>
      <Dialog.Header aria-label="Replace me with an accessible title"/>
      <Dialog.Body>${figma.helpers.react.renderChildren(children)}</Dialog.Body>
      <Dialog.Footer>${figma.helpers.react.renderChildren(footer)}</Dialog.Footer>
    </Dialog>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Footer") === false &&
  figma.selectedInstance.getPropertyValue("Show title") === true
) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
    "Full screen": "full-screen",
  });
  const title = figma.selectedInstance.findText("Title").__render__();

  template = {
    id: "Dialog",
    imports: ['import { Dialog } from "@reapit/elements/core/dialog";'],
    example: figma.code`<Dialog${figma.helpers.react.renderProp("size", size)}>
      <Dialog.Header action={<Dialog.HeaderCloseButton />}>${figma.helpers.react.renderChildren(
        title,
      )}</Dialog.Header>
      <Dialog.Body>${figma.helpers.react.renderChildren(children)}</Dialog.Body>
    </Dialog>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Footer") === false &&
  figma.selectedInstance.getPropertyValue("Show title") === false
) {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
    "Full screen": "full-screen",
  });

  template = {
    id: "Dialog",
    imports: ['import { Dialog } from "@reapit/elements/core/dialog";'],
    example: figma.code`<Dialog${figma.helpers.react.renderProp("size", size)}>
      <Dialog.Header action={<Dialog.HeaderCloseButton />} aria-label="Replace me with an accessible title"/>
      <Dialog.Body>${figma.helpers.react.renderChildren(children)}</Dialog.Body>
    </Dialog>`,
    metadata: { nestable: true },
  };
} else {
  const children = (function () {
    const slot = figma.properties.slot("Content slot");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const size = figma.selectedInstance.getEnum("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
    "Full screen": "full-screen",
  });

  template = {
    id: "Dialog",
    imports: ['import { Dialog } from "@reapit/elements/core/dialog";'],
    example: figma.code`<Dialog${figma.helpers.react.renderProp("size", size)}>
      <Dialog.Header action={<Dialog.HeaderCloseButton />} aria-label="Replace me with an accessible title"/>
      <Dialog.Body>${figma.helpers.react.renderChildren(children)}</Dialog.Body>
    </Dialog>`,
    metadata: { nestable: true },
  };
}

export default template;

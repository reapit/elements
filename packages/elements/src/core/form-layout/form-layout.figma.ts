// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=19950-19382&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/form-layout/form-layout.tsx
// component=FormLayout

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (
  figma.selectedInstance.getPropertyValue("Form header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === true
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const description = figma.selectedInstance.findText("Form description").__render__();
  const footer = figma.selectedInstance.getBoolean("↳ Show footer", {
    true: figma.properties.children(["Form footer"]),
    false: undefined,
  });

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>${figma.helpers.react.renderChildren(title)}</FormLayout.Title>
        <FormLayout.Description>${figma.helpers.react.renderChildren(
          description,
        )}</FormLayout.Description>
      </FormLayout.Header>
      ${figma.helpers.react.renderChildren(children)}
      <FormLayout.Footer>${figma.helpers.react.renderChildren(footer)}</FormLayout.Footer>
    </FormLayout>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Form header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === false &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === true
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.selectedInstance.getBoolean("↳ Show footer", {
    true: figma.properties.children(["Form footer"]),
    false: undefined,
  });

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>${figma.helpers.react.renderChildren(title)}</FormLayout.Title>
      </FormLayout.Header>
      ${figma.helpers.react.renderChildren(children)}
      <FormLayout.Footer>${figma.helpers.react.renderChildren(footer)}</FormLayout.Footer>
    </FormLayout>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Form header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === false
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const description = figma.selectedInstance.findText("Form description").__render__();

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>${figma.helpers.react.renderChildren(title)}</FormLayout.Title>
        <FormLayout.Description>${figma.helpers.react.renderChildren(
          description,
        )}</FormLayout.Description>
      </FormLayout.Header>
      ${figma.helpers.react.renderChildren(children)}
    </FormLayout>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Form header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === false &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === false
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>
      <FormLayout.Header>
        <FormLayout.Title>${figma.helpers.react.renderChildren(title)}</FormLayout.Title>
      </FormLayout.Header>
      ${figma.helpers.react.renderChildren(children)}
    </FormLayout>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Form header") === false &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === true
) {
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const footer = figma.selectedInstance.getBoolean("↳ Show footer", {
    true: figma.properties.children(["Form footer"]),
    false: undefined,
  });

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>
      ${figma.helpers.react.renderChildren(children)}
      <FormLayout.Footer>${figma.helpers.react.renderChildren(footer)}</FormLayout.Footer>
    </FormLayout>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Form header") === false &&
  figma.selectedInstance.getPropertyValue("↳ Show footer") === false
) {
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>${figma.helpers.react.renderChildren(children)}</FormLayout>`,
    metadata: { nestable: true },
  };
} else {
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();

  template = {
    id: "FormLayout",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout>${figma.helpers.react.renderChildren(children)}</FormLayout>`,
    metadata: { nestable: true },
  };
}

export default template;

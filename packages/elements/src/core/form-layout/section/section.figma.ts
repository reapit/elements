// url=<FORM_LAYOUT_SECTION_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/form-layout/form-layout.tsx
// component=FormLayout.Section

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (
  figma.selectedInstance.getPropertyValue("Section header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === true
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();
  const description = figma.selectedInstance.findText("Section description").__render__();

  template = {
    id: "FormLayout.Section",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout.Section>
      <FormLayout.SectionHeader>
        <FormLayout.SectionTitle>${figma.helpers.react.renderChildren(
          title,
        )}</FormLayout.SectionTitle>
        <FormLayout.SectionDescription>${figma.helpers.react.renderChildren(
          description,
        )}</FormLayout.SectionDescription>
      </FormLayout.SectionHeader>
      ${figma.helpers.react.renderChildren(children)}
    </FormLayout.Section>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Section header") === true &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === false
) {
  const title = figma.selectedInstance.findText("Form title").__render__();
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();

  template = {
    id: "FormLayout.Section",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout.Section>
      <FormLayout.SectionHeader>
        <FormLayout.SectionTitle>${figma.helpers.react.renderChildren(
          title,
        )}</FormLayout.SectionTitle>
      </FormLayout.SectionHeader>
      ${figma.helpers.react.renderChildren(children)}
    </FormLayout.Section>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Section header") === false &&
  figma.selectedInstance.getPropertyValue("↳ Show description") === false
) {
  const children = (function () {
    const slot = figma.properties.slot("Form body");
    return slot
      ? slot.connectedInstances.map((instance) => instance.executeTemplate().example).flat()
      : [];
  })();

  template = {
    id: "FormLayout.Section",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout.Section>${figma.helpers.react.renderChildren(
      children,
    )}</FormLayout.Section>`,
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
    id: "FormLayout.Section",
    imports: ['import { FormLayout } from "@reapit/elements/core/form-layout";'],
    example: figma.code`<FormLayout.Section>${figma.helpers.react.renderChildren(
      children,
    )}</FormLayout.Section>`,
    metadata: { nestable: true },
  };
}

export default template;

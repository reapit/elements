// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9271&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.PrimaryAction

import figma from "figma";

// Branch per variant combination.

let template;
if (figma.selectedInstance.getPropertyValue("Style") === "Primary") {
  const children = figma.selectedInstance.findText("Value").__render__();

  template = {
    id: "Table.PrimaryAction",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.PrimaryAction href="#replace-me">${figma.helpers.react.renderChildren(
      children,
    )}</Table.PrimaryAction>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.selectedInstance.findText("Value").__render__();

  template = {
    id: "Table.PrimaryAction",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<>${figma.helpers.react.renderChildren(children)}</>`,
    metadata: { nestable: true },
  };
}

export default template;

// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9384&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.Toolbar

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Variant") === "Standard") {
  const itemCount = figma.selectedInstance.findText("Item count").__render__();
  const entityName = figma.selectedInstance.findText("Item count").__render__();

  template = {
    id: "Table.Toolbar",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.Toolbar leftContent={\`$${figma.helpers.react.renderChildren(
      itemCount,
    )} $${figma.helpers.react.renderChildren(
      entityName,
    )}\`} rightContent="TODO: Add page size select"/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Bulk actions") {
  const itemCount = figma.selectedInstance.findText("Item count").__render__();
  const entityName = figma.selectedInstance.findText("Item count").__render__();
  const bulkActions = figma.properties.children(["Bulk actions"]);
  template = {
    id: "Table.Toolbar",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.Toolbar leftContent={\`$${figma.helpers.react.renderChildren(
      itemCount,
    )} $${figma.helpers.react.renderChildren(
      entityName,
    )}\`}${figma.helpers.react.renderProp("rightContent", bulkActions)}/>`,
    metadata: { nestable: true },
  };
} else {
  const itemCount = figma.selectedInstance.findText("Item count").__render__();
  const entityName = figma.selectedInstance.findText("Item count").__render__();
  const bulkActions = figma.properties.children(["Bulk actions"]);
  template = {
    id: "Table.Toolbar",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.Toolbar leftContent={\`$${figma.helpers.react.renderChildren(
      itemCount,
    )} $${figma.helpers.react.renderChildren(
      entityName,
    )}\`}${figma.helpers.react.renderProp("rightContent", bulkActions)}/>`,
    metadata: { nestable: true },
  };
}

export default template;

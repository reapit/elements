// url=<TABLE_SINGLE_LINE_CELL_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.BodyCell

import figma from "figma";

// Branch per variant combination.

let template;
if (figma.selectedInstance.getPropertyValue("Skeleton") === true) {
  template = {
    id: "Table.BodyCell",
    imports: [
      'import { Skeleton } from "@reapit/elements/core/skeleton";',
      'import { Table } from "@reapit/elements/core/table";',
    ],
    example: figma.code`<Table.BodyCell>
      <Skeleton width="100px"/>
    </Table.BodyCell>`,
  };
} else {
  const children = figma.selectedInstance.getEnum("Data", {
    Address: figma.selectedInstance.findText("Value").__render__(),
    Alphanumeric: figma.selectedInstance.findText("Value").__render__(),
    Badge: figma.properties.children(["Badge"]),
    "Data not available": "Not available",
    "Date and time": figma.selectedInstance.findText("Content").__render__(),
    Features: figma.properties.children(["Features"]),
    Icon: figma.properties.children(["Icon"]),
    "Icon and value": figma.properties.children(["*"]),
    "Status indicator": figma.properties.children(["Status indicator"]),
    Tags: figma.properties.children(["Tag group"]),
    "Value and icon": figma.properties.children(["*"]),
  });

  template = {
    id: "Table.BodyCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.BodyCell>${figma.helpers.react.renderChildren(
      children,
    )}</Table.BodyCell>`,
    metadata: { nestable: true },
  };
}

export default template;

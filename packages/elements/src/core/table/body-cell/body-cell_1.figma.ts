// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9109&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.BodyCell

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Data") === "Address") {
  const line1 = figma.properties.children(["Row 1"]);
  const line2 = figma.selectedInstance.findText("Row 2").__render__();
  const thumbnail = figma.properties.children(["Avatar rectangle"]);

  template = {
    id: "Table.BodyCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.BodyCell>
      <Table.DoubleLineLayout${figma.helpers.react.renderProp(
        "mediaItem",
        thumbnail,
      )}${figma.helpers.react.renderProp("supplementaryData", line2)}>
        ${figma.helpers.react.renderChildren(line1)}
      </Table.DoubleLineLayout>
    </Table.BodyCell>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Data") === "Avatar") {
  const avatar = figma.properties.children(["Avatar"]);
  const line1 = figma.properties.children(["Row 1"]);
  const line2 = figma.selectedInstance.findText("Row 2").__render__();

  template = {
    id: "Table.BodyCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.BodyCell>
      <Table.DoubleLineLayout${figma.helpers.react.renderProp(
        "mediaItem",
        avatar,
      )}${figma.helpers.react.renderProp("supplementaryData", line2)}>
        ${figma.helpers.react.renderChildren(line1)}
      </Table.DoubleLineLayout>
    </Table.BodyCell>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Data") === "Mixed data") {
  const line1 = figma.properties.children(["First row data"]);
  const line2 = figma.properties.children(["Second row data"]);

  template = {
    id: "Table.BodyCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.BodyCell>
      <Table.DoubleLineLayout${figma.helpers.react.renderProp(
        "supplementaryData",
        line2,
      )}>${figma.helpers.react.renderChildren(line1)}</Table.DoubleLineLayout>
    </Table.BodyCell>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Skeleton") === true) {
  const justifySelf = figma.selectedInstance.getEnum("Alignment", {
    Left: "start",
    Center: "center",
    Right: "end",
  });
  const mediaItem = figma.selectedInstance.getEnum("Data", {
    Address: figma.helpers.react.jsxElement('<Skeleton width="48px" height="40px" />'),
    Avatar: figma.helpers.react.jsxElement(
      '<Skeleton borderRadius="100%" width="36px" height="36px" />',
    ),
    "Mixed data": undefined,
  });

  template = {
    id: "Table.BodyCell",
    imports: [
      'import { Skeleton } from "@reapit/elements/core/skeleton";',
      'import { Table } from "@reapit/elements/core/table";',
    ],
    example: figma.code`<Table.BodyCell${figma.helpers.react.renderProp(
      "justifySelf",
      justifySelf,
    )}>
      <Table.DoubleLineLayout${figma.helpers.react.renderProp(
        "mediaItem",
        mediaItem,
      )} supplementaryData={<Skeleton width="124px"/>}>
        <Skeleton width="148px"/>
      </Table.DoubleLineLayout>
    </Table.BodyCell>`,
    metadata: { nestable: true },
  };
} else {
  const justifySelf = figma.selectedInstance.getEnum("Alignment", {
    Left: "start",
    Center: "center",
    Right: "end",
  });
  const mediaItem = figma.selectedInstance.getEnum("Data", {
    Address: figma.helpers.react.jsxElement('<Skeleton width="48px" height="40px" />'),
    Avatar: figma.helpers.react.jsxElement(
      '<Skeleton borderRadius="100%" width="36px" height="36px" />',
    ),
    "Mixed data": undefined,
  });

  template = {
    id: "Table.BodyCell",
    imports: [
      'import { Skeleton } from "@reapit/elements/core/skeleton";',
      'import { Table } from "@reapit/elements/core/table";',
    ],
    example: figma.code`<Table.BodyCell${figma.helpers.react.renderProp(
      "justifySelf",
      justifySelf,
    )}>
      <Table.DoubleLineLayout${figma.helpers.react.renderProp(
        "mediaItem",
        mediaItem,
      )} supplementaryData={<Skeleton width="124px"/>}>
        <Skeleton width="148px"/>
      </Table.DoubleLineLayout>
    </Table.BodyCell>`,
    metadata: { nestable: true },
  };
}

export default template;

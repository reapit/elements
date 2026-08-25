// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9168&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.HeaderCell

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue("Sortable") === false) {
  const children = figma.selectedInstance.getString("Value");
  const justifySelf = figma.selectedInstance.getEnum("Alignment", {
    Center: "center",
    Left: "start",
    Right: "end",
  });

  template = {
    id: "Table.HeaderCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.HeaderCell${figma.helpers.react.renderProp(
      "justifySelf",
      justifySelf,
    )}>${figma.helpers.react.renderChildren(children)}</Table.HeaderCell>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue("Sortable") === true) {
  const children = figma.selectedInstance.getString("Value");
  const direction = figma.selectedInstance.getEnum("State", {
    Default: "none",
    Hover: "none",
    Focus: "none",
    Sorted: "descending",
    "n/a": "none",
  });
  const justifySelf = figma.selectedInstance.getEnum("Alignment", {
    Center: "center",
    Left: "start",
    Right: "end",
  });

  template = {
    id: "Table.HeaderCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.HeaderCell${figma.helpers.react.renderProp(
      "justifySelf",
      justifySelf,
    )}>
      <Table.SortButton name="replace-me"${figma.helpers.react.renderProp("value", direction)}>
        ${figma.helpers.react.renderChildren(children)}
      </Table.SortButton>
    </Table.HeaderCell>`,
    metadata: { nestable: true },
  };
} else {
  const children = figma.selectedInstance.getString("Value");
  const direction = figma.selectedInstance.getEnum("State", {
    Default: "none",
    Hover: "none",
    Focus: "none",
    Sorted: "descending",
    "n/a": "none",
  });
  const justifySelf = figma.selectedInstance.getEnum("Alignment", {
    Center: "center",
    Left: "start",
    Right: "end",
  });

  template = {
    id: "Table.HeaderCell",
    imports: ['import { Table } from "@reapit/elements/core/table";'],
    example: figma.code`<Table.HeaderCell${figma.helpers.react.renderProp(
      "justifySelf",
      justifySelf,
    )}>
      <Table.SortButton name="replace-me"${figma.helpers.react.renderProp("value", direction)}>
        ${figma.helpers.react.renderChildren(children)}
      </Table.SortButton>
    </Table.HeaderCell>`,
    metadata: { nestable: true },
  };
}

export default template;

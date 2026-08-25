// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9348&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.HeaderRow

import figma from "figma";
import type { InstanceHandle } from "figma";

const checkbox = figma.selectedInstance.getBoolean("Selectable", {
  true: figma.helpers.react.jsxElement(
    '<Table.HeaderCell aria-label="Selection">\n          <Table.Checkbox aria-label="Select all rows" />\n        </Table.HeaderCell>',
  ),
  false: undefined,
});
const moreActions = figma.selectedInstance.getBoolean("More button", {
  true: figma.helpers.react.jsxElement('<Table.HeaderCell aria-label="Actions" />'),
  false: undefined,
});
const content = (function () {
  const nestedLayer22 = figma.selectedInstance.findInstance("Content");
  return {
    cells:
      nestedLayer22.type !== "ERROR"
        ? nestedLayer22.children
            .filter(
              (child): child is InstanceHandle =>
                child.type === "INSTANCE" && child.name === "Header cell",
            )
            .map((child) => child.executeTemplate().example)
            .flat()
        : undefined,
  };
})();

export default {
  id: "Table.HeaderRow",
  imports: ['import { Table } from "@reapit/elements/core/table";'],
  example: figma.code`<Table.HeaderRow>
      ${figma.helpers.react.renderChildren(checkbox)}
      ${figma.helpers.react.renderChildren(content.cells)}
      ${figma.helpers.react.renderChildren(moreActions)}
    </Table.HeaderRow>`,
  metadata: { nestable: true },
};

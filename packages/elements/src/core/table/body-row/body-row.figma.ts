// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=6364-9357&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/table/table.tsx
// component=Table.BodyRow

import figma from "figma";

const checkbox = figma.selectedInstance.getBoolean("Selectable", {
  true: figma.helpers.react.jsxElement(
    '<Table.BodyCell>\n          <Table.Checkbox aria-label="Select XXX" />\n        </Table.BodyCell>',
  ),
  false: undefined,
});
const moreActions = figma.selectedInstance.getBoolean("More button", {
  true: figma.helpers.react.jsxElement(
    '<Table.BodyCell>\n          <Table.MoreActions aria-label="Replace me">TODO: add menu items</Table.MoreActions>\n        </Table.BodyCell>',
  ),
  false: undefined,
});
const content = (function () {
  const nestedLayer23 = figma.selectedInstance.findInstance("Content");
  return {
    cells:
      nestedLayer23.type !== "ERROR"
        ? nestedLayer23.children
            .filter((child) => child.type === "INSTANCE")
            .map((child) => child.executeTemplate().example)
            .flat()
        : undefined,
  };
})();

export default {
  id: "Table.BodyRow",
  imports: ['import { Table } from "@reapit/elements/core/table";'],
  example: figma.code`<Table.BodyRow>
      ${figma.helpers.react.renderChildren(checkbox)}
      ${figma.helpers.react.renderChildren(content.cells)}
      ${figma.helpers.react.renderChildren(moreActions)}
    </Table.BodyRow>`,
  metadata: { nestable: true },
};

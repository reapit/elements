import preview from "#.storybook/preview";

import { TableProvider } from "./table-provider";

const meta = preview.meta({
  title: "Lab/TableProvider",
  component: TableProvider,
});

export default meta;

export const BasicUsage = meta.story({
  args: {
    rows: [],
    idKey: "id",
    children: <div>Table Provider Example</div>,
  },
  render: (args) => <TableProvider {...args} />,
});

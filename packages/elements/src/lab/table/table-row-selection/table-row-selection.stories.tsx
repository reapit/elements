import preview from "#.storybook/preview";
import { Table } from "#src/core/table";
import { TableBody } from "#src/core/table/body";
import { TableBodyCell } from "#src/core/table/body-cell";
import { TableBodyRow } from "#src/core/table/body-row";
import { TableHead } from "#src/core/table/head";
import { TableHeaderCell } from "#src/core/table/header-cell";
import { TableHeaderRow } from "#src/core/table/header-row";

import { TableProvider } from "../table-provider";
import { TableRowSelection } from "./table-row-selection";
import { TableRowSelectionProps } from "./types";
import { useRowSelection } from "./use-row-selection";

const meta = preview.meta({
  title: "Lab/TableRowSelection",
  component: TableRowSelection,
});

export default meta;

const tableData = [
  { contactId: "12P0168", firstname: "Danish", lastname: "Ali" },
  { contactId: "12P0175", firstname: "Kushal", lastname: "Salonki" },
  { contactId: "12P0179", firstname: "Adam", lastname: "Snow" },
];

const RowSelectionDemo: React.FC<TableRowSelectionProps> = () => {
  const { handleRowSelect, handleSelectAll, isRowSelected, isIndeterminate } = useRowSelection({
    rows: tableData,
    idKey: "contactId",
  });

  return (
    <TableProvider rows={tableData} idKey="contactId">
      <Table columns="auto 1fr 1fr">
        <TableHead>
          <TableHeaderRow>
            <TableHeaderCell>
              <TableRowSelection
                isIndeterminate={isIndeterminate}
                isSelectAll
                aria-label="Select all rows"
                onChange={handleSelectAll}
                checked={tableData.every((row) => isRowSelected(row.contactId))}
              />
            </TableHeaderCell>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
          </TableHeaderRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((row) => (
              <TableBodyRow
                key={row.contactId}
                aria-selected={isRowSelected(row.contactId)}
                onClick={() => handleRowSelect(row.contactId)}
              >
                <TableBodyCell>
                  <TableRowSelection
                    id={row.contactId}
                    aria-label={`Select row ${row.contactId}`}
                    onChange={() => handleRowSelect(row.contactId)}
                    checked={isRowSelected(row.contactId)}
                  />
                </TableBodyCell>
                <TableBodyCell>{row.firstname}</TableBodyCell>
                <TableBodyCell>{row.lastname}</TableBodyCell>
              </TableBodyRow>
            ))
          ) : (
            <TableBodyRow>
              <TableBodyCell aria-colspan={3}>No data to display</TableBodyCell>
            </TableBodyRow>
          )}
        </TableBody>
      </Table>
    </TableProvider>
  );
};

export const BasicUsage = meta.story({
  args: { id: "", isSelectAll: false, onChange: () => {}, checked: false },
  render: (props) => <RowSelectionDemo {...props} />,
  parameters: {
    docs: {
      source: {
        code: `
const { handleRowSelect, handleSelectAll, isRowSelected, isIndeterminate } = useRowSelection({
  rows: tableData,
  idKey: 'contactId',
})
<TableProvider rows={tableData} idKey="contactId">
  <Table columns="auto 1fr 1fr">
    <TableHead>
      <TableHeaderRow>
        <TableHeaderCell>
          <TableRowSelection
            isIndeterminate={isIndeterminate}
            isSelectAll
            aria-label="Select all rows"
            onChange={handleSelectAll}
            checked={tableData.every((row) => isRowSelected(row.contactId))}
          />
        </TableHeaderCell>
        <TableHeaderCell>First Name</TableHeaderCell>
        <TableHeaderCell>Last Name</TableHeaderCell>
      </TableHeaderRow>
    </TableHead>
    <TableBody>
      {tableData.map((row) => (
        <TableBodyRow
          key={row.contactId}
          aria-selected={isRowSelected(row.contactId)}
          onClick={() => handleRowSelect(row.contactId)}
        >
          <TableBodyCell>
            <TableRowSelection
              id={row.contactId}
              aria-label={\`Select row \${row.contactId}\`}
              onChange={() => handleRowSelect(row.contactId)}
              checked={isRowSelected(row.contactId)}
            />
          </TableBodyCell>
          <TableBodyCell>{row.firstname}</TableBodyCell>
          <TableBodyCell>{row.lastname}</TableBodyCell>
        </TableBodyRow>
      ))}
    </TableBody>
  </Table>
</TableProvider>
        `,
      },
    },
  },
});

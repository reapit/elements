import { TableRowSelection } from './table-row-selection'
import { useRowSelection } from './use-row-selection'
import { TableRowSelectionProps } from './types'
import { TableProvider } from '../table-provider'
import { TableContainer } from '../table-container'
import { Table } from '../table/table'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableRow } from '../table-row'
import { TableBody } from '../table-body'
import { TableCell } from '../table-cell'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/TableRowSelection',
  component: TableRowSelection,
} satisfies Meta<typeof TableRowSelection>

export default meta

type Story = StoryObj<typeof meta>

const tableData = [
  { contactId: '12P0168', firstname: 'Danish', lastname: 'Ali' },
  { contactId: '12P0175', firstname: 'Kushal', lastname: 'Salonki' },
  { contactId: '12P0179', firstname: 'Adam', lastname: 'Snow' },
]

const RowSelectionDemo: React.FC<TableRowSelectionProps> = () => {
  const { handleRowSelect, handleSelectAll, isRowSelected } = useRowSelection({
    rows: tableData,
    idKey: 'contactId',
  })

  return (
    <TableProvider rows={tableData} idKey="contactId">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                <TableRowSelection
                  isIndeterminate={tableData.some((row) => isRowSelected(row.contactId))}
                  isSelectAll
                  aria-label="Select all rows"
                  onChange={handleSelectAll}
                  checked={tableData.every((row) => isRowSelected(row.contactId))}
                />
              </TableHeaderCell>
              <TableHeaderCell>First Name</TableHeaderCell>
              <TableHeaderCell>Last Name</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.length > 0 ? ( // Check if tableData is defined AND has data
              tableData.map((row) => (
                <TableRow
                  key={row.contactId}
                  isSelected={isRowSelected(row.contactId)}
                  onClick={() => handleRowSelect(row.contactId)}
                >
                  <TableCell>
                    <TableRowSelection
                      id={row.contactId}
                      aria-label={`Select row ${row.contactId}`}
                      onChange={() => handleRowSelect(row.contactId)}
                      checked={isRowSelected(row.contactId)}
                    />
                  </TableCell>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data to display</TableCell>
              </TableRow> // Or a loading indicator if you prefer
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableProvider>
  )
}

export const BasicUsage: Story = {
  args: { id: '', isSelectAll: false, onChange: () => {}, checked: false },
  render: (props) => <RowSelectionDemo {...props} />,
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
const { handleRowSelect, handleSelectAll, isRowSelected } = useRowSelection({
  rows: tableData,
  idKey: 'contactId',
})
<TableProvider rows={tableData} idKey="contactId">
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>
            <TableRowSelection
              isIndeterminate={tableData.some((row) => isRowSelected(row.contactId))}
              isSelectAll
              aria-label="Select all rows"
              onChange={handleSelectAll}
              checked={tableData.every((row) => isRowSelected(row.contactId))}
            />
          </TableHeaderCell>
          <TableHeaderCell>First Name</TableHeaderCell>
          <TableHeaderCell>Last Name</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData && tableData.length > 0 ? (
          tableData.map((row) => (
            <TableRow
              key={row.contactId}
              isSelected={isRowSelected(row.contactId)}
              onClick={() => handleRowSelect(row.contactId)}
            >
              <TableCell>
                <TableRowSelection
                  id={row.contactId}
                  aria-label={\`Select row \`}
                  onChange={() => handleRowSelect(row.contactId)}
                  checked={isRowSelected(row.contactId)}
                />
              </TableCell>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No data to display</TableCell>
          </TableRow> // Or a loading indicator if you prefer
        )}
      </TableBody>
    </Table>
  </TableContainer>
</TableProvider>
        `,
      },
    },
  },
}

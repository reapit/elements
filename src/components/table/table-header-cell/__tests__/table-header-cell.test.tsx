import { render } from '@testing-library/react'
import { Table } from '../../table/table'
import { TableHead } from '../../table-head/table-head'
import { TableHeaderCell } from '../table-header-cell'

describe('TableHeaderCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <TableHead>
          <TableHeaderCell>Table Header Cell</TableHeaderCell>
        </TableHead>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

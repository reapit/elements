import { render } from '@testing-library/react'
import { TableToolbar } from '../../table-toolbar'
import { Table } from '../../table/table'

describe('TableHeaderCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

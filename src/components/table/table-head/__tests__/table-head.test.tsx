import { render } from '@testing-library/react'
import { TableHead } from '../index'
import { Table } from '../../table/table'

describe('TableHead', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <TableHead>
          <th>test th</th>
        </TableHead>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

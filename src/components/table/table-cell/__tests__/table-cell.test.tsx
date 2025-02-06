import { render } from '@testing-library/react'
import { TableCell } from '../index'
import { TableToolbar } from '../../table-toolbar'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableCell>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      </TableCell>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

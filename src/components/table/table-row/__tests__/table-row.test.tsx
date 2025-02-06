import { render } from '@testing-library/react'
import { TableRow } from '../index'
import { TableToolbar } from '../../table-toolbar'

describe('TableRow', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableRow>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      </TableRow>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

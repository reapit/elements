import { render } from '@testing-library/react'
import { TableHead } from '../index'
import { TableToolbar } from '../../table-toolbar'

describe('TableHead', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableHead>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      </TableHead>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

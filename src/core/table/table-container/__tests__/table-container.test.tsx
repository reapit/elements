import { render } from '@testing-library/react'
import { TableContainer } from '../index'
import { TableToolbar } from '../../table-toolbar'

describe('Table Container', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableContainer>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      </TableContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

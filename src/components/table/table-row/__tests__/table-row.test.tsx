import { render } from '@testing-library/react'
import { TableRow } from '../index'

describe('TableRow', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableRow>
        <td>Mock cell</td>
      </TableRow>,
      {
        wrapper: (props) => (
          <table>
            <tbody {...props} />
          </table>
        ),
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

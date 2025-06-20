import { render } from '@testing-library/react'
import { TableBody } from '../index'

describe('TableBody', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableBody>
        <tr>
          <td>Mock cell</td>
        </tr>
      </TableBody>,
      {
        wrapper: (props) => <table {...props} />,
      },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

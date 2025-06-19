import { render } from '@testing-library/react'
import { TableHead } from '../index'

describe('TableHead', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableHead>
        <tr>
          <td>Mock cell</td>
        </tr>
      </TableHead>,
      { wrapper: (props) => <table {...props} /> },
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

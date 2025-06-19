import { render } from '@testing-library/react'
import { TableCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableCell>td</TableCell>, {
      wrapper: (props) => (
        <table>
          <tbody>
            <tr {...props} />
          </tbody>
        </table>
      ),
    })
    expect(asFragment()).toMatchSnapshot()
  })
})

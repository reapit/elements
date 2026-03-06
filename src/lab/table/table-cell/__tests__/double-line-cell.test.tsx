import { render } from '@testing-library/react'
import { DoubleLineCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <tr>
            <DoubleLineCell>td</DoubleLineCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

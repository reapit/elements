import { render } from '@testing-library/react'
import { SingleLineCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <tr>
            <SingleLineCell>td</SingleLineCell>
          </tr>
        </tbody>
      </table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

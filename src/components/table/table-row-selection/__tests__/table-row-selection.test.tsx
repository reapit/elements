import { render } from '@testing-library/react'
import { TableRowSelection } from '../index'

describe('TableRowSelection', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableRowSelection checked={false} onChange={vi.fn()} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

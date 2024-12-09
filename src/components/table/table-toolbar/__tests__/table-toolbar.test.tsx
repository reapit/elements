import { render } from '@testing-library/react'
import { TableToolbar } from '../index'

describe('Table Toolbar', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableToolbar description="125 Properties" actions="Page Size menu" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

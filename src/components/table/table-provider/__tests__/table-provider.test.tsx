import { render } from '@testing-library/react'
import { TableProvider } from '../index'

describe('TableProvider', () => {
  test('should match snapshot', () => {
    const mockRows = []
    const mockIdKey = 'id'
    const { asFragment } = render(
      <TableProvider rows={mockRows} idKey={mockIdKey}>
        <div>Test Child</div>
      </TableProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

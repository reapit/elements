import { render } from '@testing-library/react'
import { NavSearchButton } from '../search-button'

describe('NavSearchButton', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NavSearchButton />)

    expect(asFragment()).toMatchSnapshot()
  })
})

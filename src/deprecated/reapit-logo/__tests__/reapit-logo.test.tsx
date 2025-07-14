import { render } from '@testing-library/react'
import { ReapitLogo } from '..'

describe('Reapit logo', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ReapitLogo />)

    expect(asFragment()).toMatchSnapshot()
  })
})

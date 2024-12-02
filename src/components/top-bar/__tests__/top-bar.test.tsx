import { render } from '@testing-library/react'
import { TopBar, ReapitLogo } from '..'

describe('TopBar Snapshot', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <TopBar.Logo>
        <ReapitLogo />
      </TopBar.Logo>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

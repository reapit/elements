import { render } from '@testing-library/react'
import { NavSearchButton } from '../nav-search-button'

describe('NavSearchButton', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NavSearchButton onClick={() => void 0} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('render without shortcut and match snapshot', () => {
    const { asFragment } = render(<NavSearchButton onClick={() => void 0} isShortcutVisible={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})

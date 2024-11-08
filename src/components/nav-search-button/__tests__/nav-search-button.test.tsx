import { render } from '@testing-library/react'
import { NavSearchButton } from '../nav-search-button'

describe('NavSearchButton', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NavSearchButton />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('render without shortcut and match snapshot', () => {
    const { asFragment } = render(<NavSearchButton isShortcutVisible={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})

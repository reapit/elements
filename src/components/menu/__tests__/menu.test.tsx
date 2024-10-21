import { render } from '@testing-library/react'
import { Menu } from '../menu'

describe('Menu list component', () => {
  it('should render menu with list components and match snapshots', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.List>Menu content</Menu.List>
      </Menu>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

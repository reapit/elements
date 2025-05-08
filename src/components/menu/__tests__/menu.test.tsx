import { render } from '@testing-library/react'
import { Menu } from '../menu'

describe('Menu list component', () => {
  it('should render menu with list components and match snapshots', () => {
    const { asFragment } = render(
      <Menu>
        <Menu.List>
          <Menu.Group label="Group Title">
            <Menu.Item href="/#" label="Menu item as anchor" />
            <Menu.Item label="Menu item as button" />
          </Menu.Group>
        </Menu.List>
      </Menu>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

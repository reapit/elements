import { render } from '@testing-library/react'
import { DeprecatedMenu } from '../menu'

describe('Menu list component', () => {
  it('should render menu with list components and match snapshots', () => {
    const { asFragment } = render(
      <DeprecatedMenu>
        <DeprecatedMenu.List>
          <DeprecatedMenu.Group label="Group Title">
            <DeprecatedMenu.Item href="/#" label="Menu item as anchor" />
            <DeprecatedMenu.Item label="Menu item as button" />
          </DeprecatedMenu.Group>
        </DeprecatedMenu.List>
      </DeprecatedMenu>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

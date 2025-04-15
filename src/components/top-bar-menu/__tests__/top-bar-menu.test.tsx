import { render } from '@testing-library/react'
import { TopBarMenu } from '../top-bar-menu'

vi.mock('../../icon', () => ({
  Icon: () => <svg data-name="mocked" />,
}))
describe('TopbarMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <TopBarMenu isOpen onClose={vi.fn()}>
          <TopBarMenu.Header />
          <TopBarMenu.Body>
            <TopBarMenu.List>
              <TopBarMenu.Group label="Main Nav Item 1" hasBadge>
                <TopBarMenu.Item label="Label" href="#item-1.1" />
                <TopBarMenu.Item label="Label" href="#item-1.2" />
              </TopBarMenu.Group>
              <TopBarMenu.Item label="Main Nav Item 2" href="#item-2" />
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item label="User Item 1" href="#item-1.1" />
              <TopBarMenu.Item label="User Item 2" href="#item-1.1" />
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})

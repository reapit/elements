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
                <TopBarMenu.Item href="#item-1.1">Label</TopBarMenu.Item>
                <TopBarMenu.Item href="#item-1.2">Label</TopBarMenu.Item>
              </TopBarMenu.Group>
              <TopBarMenu.Item href="#item-2">Main Nav Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
            <TopBarMenu.List>
              <TopBarMenu.Item href="#item-1.1">User Item 1</TopBarMenu.Item>
              <TopBarMenu.Item href="#item-1.1">User Item 2</TopBarMenu.Item>
            </TopBarMenu.List>
          </TopBarMenu.Body>
        </TopBarMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})

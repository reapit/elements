import { render } from '@testing-library/react'
import { MobileNavMenu } from '../mobile-nav-menu'

describe('MobileNavMenu', () => {
  it('should match a snapshot when isOpen state is true', () => {
    expect(
      render(
        <MobileNavMenu isOpen onClose={vi.fn()}>
          <MobileNavMenu.Header onClose={vi.fn()} />
          <MobileNavMenu.Content>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="Main Nav Item 1" hasBadge>
                <MobileNavMenu.Item label="Label" href="#item-1.1" />
                <MobileNavMenu.Item label="Label" href="#item-1.2" />
                <MobileNavMenu.Item label="Label" href="#item-1.3" />
                <MobileNavMenu.Item label="Label" href="#item-1.4" />
                <MobileNavMenu.Item label="Label" href="#item-1.5" />
              </MobileNavMenu.Item>
            </MobileNavMenu.ItemGroup>
            <MobileNavMenu.ItemGroup>
              <MobileNavMenu.Item label="User Item 1" href="#item-1.1" />
              <MobileNavMenu.Item label="User Item 2" href="#item-1.1" />
            </MobileNavMenu.ItemGroup>
          </MobileNavMenu.Content>
        </MobileNavMenu>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})

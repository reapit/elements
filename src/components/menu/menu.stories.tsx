import type { Meta, StoryObj } from '@storybook/react'
import { ElMenuItemAnchor, ElMenuItemButton, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuList, Menu } from '.'
import { Button } from '../button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
      <ElMenuList role="menu">
        <ElMenuItemGroup role="group">
          <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
          <ElMenuItemButton role="menuitem">Menu Item</ElMenuItemButton>
          <ElMenuItemButton role="menuitem">Menu Item</ElMenuItemButton>
          <ElMenuItemAnchor href="/#" role="menuitem">
            Menu Item as anchor
          </ElMenuItemAnchor>
        </ElMenuItemGroup>
      </ElMenuList>
    )
  },
}

export const ReactUsage: Story = {
  render: () => {
    return (
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => (
            <Button
              {...getTriggerProps()}
              buttonIcon={{
                icon: 'more',
                position: 'only',
              }}
            />
          )}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>
            <Menu.Group label="Group Title">
              <Menu.Item onClick={console.log}>Menu Item</Menu.Item>
              <Menu.Item href="/#">Menu Item as anchor</Menu.Item>
              <Menu.Item closeMenu={false}>Menu Item (keep open)</Menu.Item>
            </Menu.Group>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { ElMenu, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemGroupTitle, Menu } from '.'
import { Button } from '../button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
      <ElMenu>
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
          </li>
          <ElMenuItemContainer>
            <a href="/#">This is a Link</a>
          </ElMenuItemContainer>
          <ElMenuItemContainer>
            <Button type="button">This is a Button</Button>
          </ElMenuItemContainer>
        </ElMenuItemGroup>
      </ElMenu>
    )
  },
}

export const ReactUsage: Story = {
  render: () => (
    <Menu.List>
      <Menu.Group title="Group Title">
        <Menu.Item>
          <a href="/1">This is a Link</a>
        </Menu.Item>
        <Menu.Item>
          <Button type="button">This is element&apos;s Button</Button>
        </Menu.Item>
        <Menu.Item>
          <button type="button">This is html Button</button>
        </Menu.Item>
      </Menu.Group>
    </Menu.List>
  ),
}

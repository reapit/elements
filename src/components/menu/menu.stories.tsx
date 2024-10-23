import type { Meta, StoryObj } from '@storybook/react'
import { ElMenuItem, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuList, Menu } from '.'
import { Button } from '../button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
      <ElMenuList>
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Group Title</ElMenuItemGroupTitle>
          </li>
          <ElMenuItem>
            <a href="/#">This is a Link</a>
          </ElMenuItem>
          <ElMenuItem>
            <Button type="button">This is a Button</Button>
          </ElMenuItem>
          <ElMenuItem>
            <div role="button">This is button a div</div>
          </ElMenuItem>
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
            <Menu.Group title="Group Title">
              <Menu.Item>
                <a href="/1">This is a Link</a>
              </Menu.Item>
              <Menu.Item>
                <button type="button">This is html Button</button>
              </Menu.Item>
              <Menu.Item>
                <div role="button">This is a button div</div>
              </Menu.Item>
            </Menu.Group>
          </Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}

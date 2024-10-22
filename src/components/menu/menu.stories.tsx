import type { Meta, StoryObj } from '@storybook/react'
import { ElMenuList, Menu } from '.'
import { Button } from '../button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
}

export default meta
type Story = StoryObj<typeof Menu>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return <ElMenuList>Menu content</ElMenuList>
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
          <Menu.List>Menu content</Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}

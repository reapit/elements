import type { Meta, StoryObj } from '@storybook/react'
import { ElMenuList, Menu } from '.'
import { Button } from '../button'
import { Icon } from '../icon'

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
          {({ getTriggerProps }) => <Button {...getTriggerProps()} iconLeft={<Icon icon="more" fontSize="1rem" />} />}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>Menu content</Menu.List>
        </Menu.Popover>
      </Menu>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import {
  ElMenu,
  ElMenuItemButton,
  ElMenuItemContainer,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuItemLink,
  Menu,
  MenuItem,
  MenuItemGroup,
} from '.'
import { TextSM } from '../typography'
import { ElNavMenuOptionDivider } from '../nav'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    intent: {
      type: 'string',
    },
  },
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
            <ElMenuItemLink href="/#">
              <TextSM hasNoMargin>This is a Link</TextSM>
            </ElMenuItemLink>
          </ElMenuItemContainer>
          <ElMenuItemContainer>
            <ElMenuItemLink href="/#">
              <TextSM hasNoMargin>This is a Link</TextSM>
            </ElMenuItemLink>
          </ElMenuItemContainer>
          <ElMenuItemContainer>
            <ElMenuItemButton onClick={() => 0}>
              <TextSM hasNoMargin>This is a Button</TextSM>
            </ElMenuItemButton>
          </ElMenuItemContainer>
        </ElMenuItemGroup>
        <ElNavMenuOptionDivider />
        <ElMenuItemGroup>
          <li>
            <ElMenuItemGroupTitle>Another Group Title</ElMenuItemGroupTitle>
          </li>
          <ElMenuItemContainer>
            <ElMenuItemLink href="/#">
              <TextSM hasNoMargin>This is a Link</TextSM>
            </ElMenuItemLink>
          </ElMenuItemContainer>
        </ElMenuItemGroup>
      </ElMenu>
    )
  },
}

export const ReactShorthandWithProps: Story = {
  render: (props) => <Menu {...props} />,
  args: {
    groups: [
      {
        title: 'group title',
        items: [
          {
            children: 'This is a link',
            href: '/',
          },
          {
            children: 'This is a button',
            onClick: () => 0,
          },
        ],
      },
    ],
  },
}

export const ReactShorthandWithComponents: Story = {
  render: (props) => (
    <Menu {...props}>
      <MenuItemGroup title="Group Title">
        <MenuItem href="/">This is a link</MenuItem>
        <MenuItem onClick={() => alert('button')}>This is a button</MenuItem>
      </MenuItemGroup>
    </Menu>
  ),
}

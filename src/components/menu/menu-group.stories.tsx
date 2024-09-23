import type { Meta, StoryObj } from '@storybook/react'
import {
  ElMenuItemButton,
  ElMenuItemContainer,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuItemLink,
  MenuItem,
  MenuItemGroup,
} from '.'
import { TextSM } from '../typography'

const meta: Meta<typeof MenuItemGroup> = {
  title: 'Components/Menu/Menu Item Group',
  component: MenuItemGroup,
  argTypes: {
    title: {
      type: 'string',
    },
  },
}

export default meta
type Story = StoryObj<typeof MenuItemGroup>

export const StylesOnlyUsage: StoryObj = {
  render: () => {
    return (
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
    )
  },
}

export const ReactVersion: Story = {
  args: {
    title: 'Group Title',
  },
  render: ({ title }) => (
    <MenuItemGroup title={title}>
      <MenuItem href="#">This is a Link</MenuItem>
      <MenuItem onClick={() => 0}>This is a Button</MenuItem>
    </MenuItemGroup>
  ),
}

import { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './nav-item'
import { ElNavItemAnchor, ElNavItemButton, ElNavItemLabelContainer } from './styles'
import { FlexContainer } from '../layout'

export default {
  title: 'Components/Nav Item',
  component: NavItem,
  argTypes: {
    isActive: {
      control: false,
      description: 'Whether the nav item is active or not',
    },
    href: {
      control: false,
      description: 'Specifies the URL for anchor-style nav item',
    },
    onClick: {
      control: false,
      description: 'Click handler for nav item',
    },
    children: {
      control: false,
      description: 'Accessible label for button',
    },
    className: {
      control: false,
      description: 'CSS class for additional styling',
    },
  },
} as Meta<typeof NavItem>

export const Default: StoryObj<typeof NavItem> = {
  render: () => (
    <FlexContainer>
      <ElNavItemButton className="el-mr5">
        <ElNavItemLabelContainer>Button</ElNavItemLabelContainer>
      </ElNavItemButton>
      <ElNavItemAnchor href="#">
        <ElNavItemLabelContainer>Link</ElNavItemLabelContainer>
      </ElNavItemAnchor>
    </FlexContainer>
  ),
}

export const ActiveState: StoryObj<typeof NavItem> = {
  render: () => (
    <ElNavItemAnchor aria-current="true" href="#">
      <ElNavItemLabelContainer>Active Link</ElNavItemLabelContainer>
    </ElNavItemAnchor>
  ),
}

export const ReactUsageAnchor: StoryObj<typeof NavItem> = {
  args: {
    children: 'Link',
    href: '#',
  },
}

export const ReactUsageButton: StoryObj<typeof NavItem> = {
  args: {
    children: 'Button',
  },
}

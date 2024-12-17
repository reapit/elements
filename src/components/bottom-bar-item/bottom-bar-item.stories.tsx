import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '../icon'
import { FlexContainer } from '../layout'
import { BottomBarItem } from './bottom-bar-item'

const meta = {
  title: 'Components/Bottom Bar Item',
  component: BottomBarItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    icon: {
      control: false,
      description: 'The icon to be displayed',
    },
    isActive: {
      control: false,
      description: 'Whether the bottom bar item is active or not',
    },
    hasBadge: {
      control: false,
      description: 'Whether the bottom bar item has a badge or not',
    },
    href: {
      control: false,
      description: 'Specifies the URL for anchor-style bottom bar item',
    },
    onClick: {
      control: false,
      description: 'Click handler for bottom bar item',
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
} satisfies Meta<typeof BottomBarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isActive: false,
    children: 'Label',
    icon: <Icon icon="star" />,
  },
}

export const Active: Story = {
  args: {
    isActive: true,
    children: 'Label',
    icon: <Icon icon="star" />,
  },
}

export const WithBadge: Story = {
  args: {
    children: 'Label',
    icon: <Icon icon="star" />,
    hasBadge: true,
  },
}

export const WithHref: Story = {
  args: {
    href: '#',
    icon: <Icon icon="star" />,
    children: 'Label',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <BottomBarItem {...args} isActive={false} className="el-mr5" />
        <BottomBarItem {...args} isActive className="el-mx5" />
        <BottomBarItem {...args} hasBadge className="el-mx5" />
      </FlexContainer>
    )
  },
}

export const WithOnClick: Story = {
  name: 'With OnClick',
  args: {
    onClick: action('handleClick'),
    icon: <Icon icon="star" />,
    children: 'Label',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <BottomBarItem {...args} isActive={false} className="el-mr5" />
        <BottomBarItem {...args} isActive className="el-mx5" />
        <BottomBarItem {...args} hasBadge className="el-mx5" />
      </FlexContainer>
    )
  },
}

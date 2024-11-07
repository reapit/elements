import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { BottomBarItem } from './bottom-bar-item'
import { FlexContainer } from '../layout'
import { Icon } from '../icon'
import {
  ElAnchorBottomBarItemContainer,
  ElBottomBarItemIcon,
  ElBottomBarItemLabel,
  ElButtonBottomBarItemContainer,
} from './styles'

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
    href: {
      control: false,
      description: 'Specifies the URL for anchor-style bottom bar item',
    },
    onClick: {
      control: false,
      description: 'Click handler for bottom bar item',
    },
    'aria-label': {
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
    'aria-label': 'Label',
    icon: <Icon icon="star" />,
  },
}

export const ActiveState: Story = {
  args: {
    isActive: true,
    'aria-label': 'Label',
    icon: <Icon icon="star" />,
  },
}

export const StyleAnchorUsage: Story = {
  args: {
    href: '#',
    'aria-label': 'Label',
    icon: <Icon icon="star" />,
  },
  render: (args) => {
    return (
      <FlexContainer>
        <ElAnchorBottomBarItemContainer href={args.href!} aria-current={undefined} className="el-mx5">
          <ElBottomBarItemIcon>{args?.icon}</ElBottomBarItemIcon>
          <ElBottomBarItemLabel>{args?.['aria-label']}</ElBottomBarItemLabel>
        </ElAnchorBottomBarItemContainer>

        <ElAnchorBottomBarItemContainer href={args.href!} aria-current="page" className="el-mx5">
          <ElBottomBarItemIcon>{args?.icon}</ElBottomBarItemIcon>
          <ElBottomBarItemLabel>{args?.['aria-label']}</ElBottomBarItemLabel>
        </ElAnchorBottomBarItemContainer>
      </FlexContainer>
    )
  },
}

export const StyleButtonUsage: Story = {
  args: {
    'aria-label': 'Label',
    icon: <Icon icon="star" />,
  },
  render: (args) => {
    return (
      <FlexContainer>
        <ElButtonBottomBarItemContainer onClick={action('handleClick')} aria-current={undefined} className="el-mx5">
          <ElBottomBarItemIcon>{args?.icon}</ElBottomBarItemIcon>
          <ElBottomBarItemLabel>{args?.['aria-label']}</ElBottomBarItemLabel>
        </ElButtonBottomBarItemContainer>

        <ElButtonBottomBarItemContainer onClick={action('handleClick')} aria-current="true" className="el-mx5">
          <ElBottomBarItemIcon>{args?.icon}</ElBottomBarItemIcon>
          <ElBottomBarItemLabel>{args?.['aria-label']}</ElBottomBarItemLabel>
        </ElButtonBottomBarItemContainer>
      </FlexContainer>
    )
  },
}

export const ReactAnchorUsage: Story = {
  args: {
    href: '#',
    icon: <Icon icon="star" />,
    'aria-label': 'Label',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <BottomBarItem {...args} isActive={false} className="el-mx5" />
        <BottomBarItem {...args} isActive className="el-mx5" />
      </FlexContainer>
    )
  },
}

export const ReactButtonUsage: Story = {
  args: {
    onClick: action('handleClick'),
    icon: <Icon icon="star" />,
    'aria-label': 'Label',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <BottomBarItem {...args} isActive={false} className="el-mx5" />
        <BottomBarItem {...args} isActive className="el-mx5" />
      </FlexContainer>
    )
  },
}

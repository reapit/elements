import type { Meta, StoryObj } from '@storybook/react'
import { NavIconItem } from './nav-icon-item'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'
import { ElAnchorNavIconItem, ElButtonNavIconItem } from './styles'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/Nav Icon Item',
  component: NavIconItem,
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
      description: 'Whether the nav icon item is active or not',
    },
    href: {
      control: false,
      description: 'Specifies the URL for anchor-style nav icon item',
    },
    onClick: {
      control: false,
      description: 'Click handler for nav icon item',
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
  args: {
    'aria-label': 'Star Icon',
  },
} satisfies Meta<typeof NavIconItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Icon icon="star" style={{ color: 'inherit' }} />,
    onClick: action('handleOnClick'),
  },
  render: (args) => {
    return (
      <ElButtonNavIconItem onClick={action('handleClick')} data-state={undefined}>
        {args?.icon}
      </ElButtonNavIconItem>
    )
  },
}

export const ActiveState: Story = {
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleOnClick'),
  },
  render: (args) => {
    return (
      <ElButtonNavIconItem onClick={action('handleClick')} aria-current="true">
        {args?.icon}
      </ElButtonNavIconItem>
    )
  },
}

export const StyleAnchorUsage: Story = {
  args: {
    icon: <Icon icon="star" />,
    href: '#',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <ElAnchorNavIconItem href={args.href!} aria-current={undefined} className="el-mx5">
          {args?.icon}
        </ElAnchorNavIconItem>
        <ElAnchorNavIconItem href={args.href!} aria-current="page" className="el-mx5">
          {args?.icon}
        </ElAnchorNavIconItem>
      </FlexContainer>
    )
  },
}

export const StyleButtonUsage: Story = {
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleClick'),
  },
  render: (args) => {
    return (
      <FlexContainer>
        <ElButtonNavIconItem onClick={action('handleClick')} aria-current={undefined} className="el-mx5">
          {args?.icon}
        </ElButtonNavIconItem>
        <ElButtonNavIconItem onClick={action('handleClick')} aria-current="true" className="el-mx5">
          {args?.icon}
        </ElButtonNavIconItem>
      </FlexContainer>
    )
  },
}

export const ReactAnchorUsage: Story = {
  args: {
    icon: <Icon icon="star" />,
    href: '#',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <NavIconItem {...args} isActive={false} className="el-mx5" />
        <NavIconItem {...args} isActive={true} className="el-ml2" />
      </FlexContainer>
    )
  },
}

export const ReactButtonUsage: Story = {
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleClick'),
  },
  render: (args) => {
    return (
      <FlexContainer>
        <NavIconItem {...args} isActive={false} className="el-mx5" />
        <NavIconItem {...args} isActive={true} className="el-ml2" />
      </FlexContainer>
    )
  },
}

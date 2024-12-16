import type { Meta, StoryObj } from '@storybook/react'
import { NavIconItem } from './nav-icon-item'
import { Icon } from '../icon'
import { FlexContainer } from '../layout'
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
    hasBadge: {
      control: false,
      description: 'Whether the nav icon item has a badge or not',
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
    return <NavIconItem {...args} />
  },
}

export const WithActiveState: Story = {
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleOnClick'),
    isActive: true,
  },
  render: (args) => {
    return <NavIconItem {...args} />
  },
}

export const WithBadge: Story = {
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleOnClick'),
    hasBadge: true,
  },
  render: (args) => {
    return <NavIconItem {...args} />
  },
}

export const WithHref: Story = {
  args: {
    icon: <Icon icon="star" />,
    href: '#',
  },
  render: (args) => {
    return (
      <FlexContainer>
        <NavIconItem {...args} isActive={false} className="el-mr5" />
        <NavIconItem {...args} isActive={true} className="el-mx5" />
        <NavIconItem {...args} hasBadge={true} className="el-mx5" />
      </FlexContainer>
    )
  },
}

export const WithOnClick: Story = {
  name: 'With OnClick',
  args: {
    icon: <Icon icon="star" />,
    onClick: action('handleClick'),
  },
  render: (args) => {
    return (
      <FlexContainer>
        <NavIconItem {...args} isActive={false} className="el-mr5" />
        <NavIconItem {...args} isActive={true} className="el-mx5" />
        <NavIconItem {...args} hasBadge={true} className="el-mx5" />
      </FlexContainer>
    )
  },
}

import type { StoryObj } from '@storybook/react'
import { Avatar, ElAvatar } from '.'
import { Icon } from '../icon'

export default {
  title: 'Components/Avatar',
  component: Avatar,
}

export const StyleOnlyUsage = {
  render: ({}) => <ElAvatar>AD</ElAvatar>,
}

export const WithIconUsage = {
  render: ({}) => (
    <ElAvatar>
      <Icon icon="contact" />
    </ElAvatar>
  ),
}

export const WithColour = {
  render: ({}) => <ElAvatar data-colour="purple">AD</ElAvatar>,
  name: 'Colour: Purple',
}

export const WithSquareShape = {
  render: ({}) => <ElAvatar data-shape="square">AD</ElAvatar>,
  name: 'Shape: Square',
}

export const WithSmallSize = {
  render: ({}) => (
    <ElAvatar data-size="small">
      <Icon icon="contact" />
    </ElAvatar>
  ),
  name: 'Size: Small',
}

export const ReactUsage: StoryObj<typeof Avatar> = {
  args: {
    shape: 'circle',
    size: 'medium',
    colour: 'default',
    children: 'AD',
  },
  render: (props) => <Avatar {...props}>{props.children}</Avatar>,
}

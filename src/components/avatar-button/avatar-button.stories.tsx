import type { StoryObj } from '@storybook/react'
import { ElAvatar } from '../avatar'
import { ElAvatarButton } from './styles'
import { AvatarButton } from '.'

export default {
  title: 'Components/Avatar Button',
  component: AvatarButton,
  argTypes: {
    label: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function for click events',
    },
  },
}

export const StyleOnlyUsage = {
  render: ({}) => (
    <ElAvatarButton>
      <ElAvatar data-size="small" data-shape="circle" data-colour="purple">
        AD
      </ElAvatar>
    </ElAvatarButton>
  ),
}

export const ReactUsage: StoryObj<typeof AvatarButton> = {
  args: {
    label: 'AD',
    onClick: console.log,
  },
}

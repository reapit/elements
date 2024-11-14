import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRectangle } from '.'
import { ElAvatarRectangle } from './styles'

export default {
  title: 'AvatarRectangle',
  component: AvatarRectangle,
  args: {
    variant: 'commercial',
    size: 'medium',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['residential', 'commercial'],
    },
    size: {
      control: 'inline-radio',
      options: ['medium', 'small'],
    },
  },
} as Meta<typeof AvatarRectangle>

const exampleImageUrl = 'https://picsum.photos/id/206/100/100'

export const StyleOnlyUsage = {
  render: ({}) => (
    <ElAvatarRectangle>
      <img src={exampleImageUrl} alt="example" />
    </ElAvatarRectangle>
  ),
}

export const ReactUsage: StoryObj<typeof AvatarRectangle> = {
  render: (props) => (
    <AvatarRectangle {...props}>
      <img src={exampleImageUrl} alt="example" />
    </AvatarRectangle>
  ),
}

export const ReactUsagePlaceholder: StoryObj<typeof AvatarRectangle> = {
  render: (props) => <AvatarRectangle {...props}></AvatarRectangle>,
}

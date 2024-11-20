import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRectangle } from '.'
import {
  ElAvatarRectangle,
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectBottomImage,
  ElAvatarRectCommercialPlaceholder,
} from './styles'

export default {
  title: 'Components/Avatar Rectangle',
  component: AvatarRectangle,
  args: {
    variant: 'residential',
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

export const DefaultUsage = {
  render: ({}) => (
    <ElAvatarRectangle>
      <img src={exampleImageUrl} alt="example" />
    </ElAvatarRectangle>
  ),
}

export const UsingResidentialPlaceholder = {
  render: ({}) => <ElAvatarRectResidentialPlaceholder aria-label="Image placeholder" />,
}

export const UsingCommercialVariant = {
  render: ({}) => (
    <ElAvatarRectangle data-variant="commercial">
      <img src={exampleImageUrl} alt="example" />
      <ElAvatarRectBottomImage aria-hidden="true" />
    </ElAvatarRectangle>
  ),
}

export const UsingCommercialPlaceholder = {
  render: ({}) => <ElAvatarRectCommercialPlaceholder aria-label="Image placeholder" />,
}

export const ReactUsage: StoryObj<typeof AvatarRectangle> = {
  args: {
    src: exampleImageUrl,
  },
  render: (props) => <AvatarRectangle {...props}></AvatarRectangle>,
}

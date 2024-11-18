import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRectangle } from '.'
import {
  ElAvatarRectangleWrapper,
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectBottomPlaceholder,
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
    <ElAvatarRectangleWrapper>
      <img src={exampleImageUrl} alt="example" />
    </ElAvatarRectangleWrapper>
  ),
}

export const UsingResidentialPlaceholder = {
  render: ({}) => (
    <ElAvatarRectangleWrapper data-variant="residential" data-placeholder="true">
      <ElAvatarRectResidentialPlaceholder />
    </ElAvatarRectangleWrapper>
  ),
}

export const UsingCommercialVariant = {
  render: ({}) => (
    <ElAvatarRectangleWrapper data-variant="commercial">
      <img src={exampleImageUrl} alt="example" />
      <ElAvatarRectBottomPlaceholder aria-hidden="true" />
    </ElAvatarRectangleWrapper>
  ),
}

export const UsingCommercialPlaceholder = {
  render: ({}) => (
    <ElAvatarRectangleWrapper data-variant="commercial" data-placeholder="true">
      <ElAvatarRectCommercialPlaceholder />
      <ElAvatarRectBottomPlaceholder aria-hidden="true" />
    </ElAvatarRectangleWrapper>
  ),
}

export const ReactUsage: StoryObj<typeof AvatarRectangle> = {
  args: {
    src: exampleImageUrl,
  },
  render: (props) => <AvatarRectangle {...props}></AvatarRectangle>,
}

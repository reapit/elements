import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRectangle } from '.'
import { ElAvatarRectResidentialPlaceholder, ElAvatarRectCommercialPlaceholder } from './styles'

export default {
  title: 'Components/Avatar Rectangle',
  component: AvatarRectangle,
  args: {
    variant: 'residential',
    size: 'medium',
    src: 'https://picsum.photos/id/206/100/100',
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

type Story = StoryObj<typeof AvatarRectangle>

/**
 * The default usage use the residential variant and medium size, each can be set using the `data-` attribute.
 */
export const DefaultUsage: Story = {}

export const UsingResidentialPlaceholder = {
  render: () => <ElAvatarRectResidentialPlaceholder aria-label="Image placeholder" />,
}

export const UsingCommercialVariant: Story = {
  args: {
    variant: 'commercial',
  },
}

export const UsingCommercialPlaceholder = {
  render: () => <ElAvatarRectCommercialPlaceholder aria-label="Image placeholder" />,
}

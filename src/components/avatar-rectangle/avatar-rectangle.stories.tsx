import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRectangle } from '.'
import {
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectCommercialPlaceholder,
  ElAvatarRectResidentialSmallPlaceholder,
  ElAvatarRectCommercialSmallPlaceholder,
} from './styles'

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

export const AvatarRectangleVariant: Story = {
  args: {
    variant: 'commercial',
  },
}

const placeholderStoryOptions = {
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    src: {
      table: {
        disable: true,
      },
    },
  },
}

/**
 * for the placeholder, there will be separate component provided for each size
 */
export const ResidentialPlaceholder: Story = {
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectResidentialPlaceholder aria-label="Image placeholder" />,
}

export const ResidentialSmallPlaceholder = {
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectResidentialSmallPlaceholder aria-label="Image placeholder" />,
}

export const CommercialPlaceholder = {
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectCommercialPlaceholder aria-label="Image placeholder" />,
}

export const CommercialSmallPlaceholder = {
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectCommercialSmallPlaceholder aria-label="Image placeholder" />,
}

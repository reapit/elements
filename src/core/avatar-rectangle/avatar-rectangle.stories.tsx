import preview from '#.storybook/preview'
import { AvatarRectangle } from '.'
import {
  ElAvatarRectResidentialPlaceholder,
  ElAvatarRectCommercialPlaceholder,
  ElAvatarRectResidentialSmallPlaceholder,
  ElAvatarRectCommercialSmallPlaceholder,
} from './styles'

const meta = preview.meta({
  title: 'Core/Avatar Rectangle',
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
})

/**
 * The default usage use the residential variant and medium size, each can be set using the `data-` attribute.
 */
export const DefaultUsage = meta.story({
  args: {
    variant: 'residential',
    size: 'medium',
  },
})

export const AvatarRectangleVariant = DefaultUsage.extend({
  args: {
    variant: 'commercial',
  },
})

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
export const ResidentialPlaceholder = meta.story({
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectResidentialPlaceholder aria-label="Image placeholder" />,
})

export const ResidentialSmallPlaceholder = meta.story({
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectResidentialSmallPlaceholder aria-label="Image placeholder" />,
})

export const CommercialPlaceholder = meta.story({
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectCommercialPlaceholder aria-label="Image placeholder" />,
})

export const CommercialSmallPlaceholder = meta.story({
  ...placeholderStoryOptions,
  render: () => <ElAvatarRectCommercialSmallPlaceholder aria-label="Image placeholder" />,
})

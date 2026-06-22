import preview from '#.storybook/preview'
import { Skeleton } from './skeleton'

const meta = preview.meta({
  title: 'Indicators and status/Skeleton',
  component: Skeleton,
  argTypes: {
    height: {
      control: 'text',
      description: 'Defines the height of the skeleton.',
    },
    width: {
      control: 'text',
      description: 'Defines the width of the skeleton.',
    },
    borderRadius: {
      control: 'text',
      description: 'Defines the border-radius of the skeleton.',
    },
  },
})

/**
 * The Skeleton component serves as a visual placeholder that represents the shape and structure of
 * the content while data is being loaded. It enhances the user experience by creating the impression of
 * faster page responsiveness, effectively bridging the gap between initial rendering and data availability.
 *
 * Designed to mimic the dimensions and layout of the final content, the Skeleton component guides users’ expectations,
 * reducing perceived wait times and improving engagement during loading states.
 */
export const Default = meta.story()

export const SquareSkeleton = meta.story({
  args: {
    height: '3rem',
    width: '3rem',
  },
})

export const CircleSkeleton = meta.story({
  args: {
    height: '3rem',
    width: '3rem',
    borderRadius: '100%',
  },
})

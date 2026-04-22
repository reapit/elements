import preview from '#.storybook/preview'
import { FeaturesBathroomsItem } from './bathrooms'

const meta = preview.meta({
  title: 'Core/Features/Bathrooms',
  component: FeaturesBathroomsItem,
  argTypes: {
    value: {
      control: 'number',
    },
  },
})

export const Example = meta.story({
  args: {
    value: 2,
  },
})

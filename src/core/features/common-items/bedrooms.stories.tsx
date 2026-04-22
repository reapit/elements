import preview from '#.storybook/preview'
import { FeaturesBedroomsItem } from './bedrooms'

const meta = preview.meta({
  title: 'Core/Features/Bedrooms',
  component: FeaturesBedroomsItem,
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

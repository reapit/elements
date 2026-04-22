import preview from '#.storybook/preview'
import { FeaturesCarSpacesItem } from './car-spaces'

const meta = preview.meta({
  title: 'Core/Features/CarSpaces',
  component: FeaturesCarSpacesItem,
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

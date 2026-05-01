import preview from '#.storybook/preview'
import { Features } from '../features'

const meta = preview.meta({
  title: 'Core/Features/Bedrooms',
  component: Features.Bedrooms,
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

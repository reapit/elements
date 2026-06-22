import preview from '#.storybook/preview'
import { Features } from '../features'

const meta = preview.meta({
  title: 'Content display/Features/Bathrooms',
  component: Features.Bathrooms,
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

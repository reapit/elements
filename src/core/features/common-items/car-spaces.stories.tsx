import preview from '#.storybook/preview'
import { Features } from '../features'

const meta = preview.meta({
  title: 'Content display/Features/CarSpaces',
  component: Features.CarSpaces,
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

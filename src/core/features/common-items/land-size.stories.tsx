import preview from '#.storybook/preview'
import { Features } from '../features'

const meta = preview.meta({
  title: 'Core/Features/LandSize',
  component: Features.LandSize,
  argTypes: {
    value: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    value: (
      <>
        375 <abbr title="square metres">sq m</abbr>
      </>
    ),
  },
})

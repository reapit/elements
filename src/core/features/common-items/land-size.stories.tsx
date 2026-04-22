import preview from '#.storybook/preview'
import { FeaturesLandSizeItem } from './land-size'

const meta = preview.meta({
  title: 'Core/Features/LandSize',
  component: FeaturesLandSizeItem,
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

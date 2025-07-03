import { FeaturesLandSizeItem } from './land-size'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Features/LandSize',
  component: FeaturesLandSizeItem,
  argTypes: {
    value: {
      control: false,
    },
  },
} satisfies Meta<typeof FeaturesLandSizeItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    value: (
      <>
        375 <abbr title="square metres">sq m</abbr>
      </>
    ),
  },
}

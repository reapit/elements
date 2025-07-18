import { FeaturesItem } from './item'
import { BathIcon } from '#src/icons/bath'
import { BedIcon } from '#src/icons/bed'
import { CarIcon } from '#src/icons/car'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Features/Item',
  component: FeaturesItem,
  argTypes: {
    icon: {
      control: 'radio',
      options: ['Bed', 'Bath', 'Car'],
      mapping: {
        Bed: <BedIcon />,
        Bath: <BathIcon />,
        Car: <CarIcon />,
      },
    },
  },
} satisfies Meta<typeof FeaturesItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    icon: <BedIcon />,
    label: 'Bedrooms',
    value: 2,
  },
}

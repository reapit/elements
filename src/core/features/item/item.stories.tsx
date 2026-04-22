import preview from '#.storybook/preview'
import { FeatureItem } from './item'
import { BathIcon } from '#src/icons/bath'
import { BedIcon } from '#src/icons/bed'
import { CarIcon } from '#src/icons/car'

const meta = preview.meta({
  title: 'Core/Features/Item',
  component: FeatureItem,
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
})

export const Example = meta.story({
  args: {
    icon: <BedIcon />,
    label: 'Bedrooms',
    value: 2,
  },
})

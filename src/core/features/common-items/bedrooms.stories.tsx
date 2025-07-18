import { FeaturesBedroomsItem } from './bedrooms'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Features/Bedrooms',
  component: FeaturesBedroomsItem,
  argTypes: {
    value: {
      control: 'number',
    },
  },
} satisfies Meta<typeof FeaturesBedroomsItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    value: 2,
  },
}

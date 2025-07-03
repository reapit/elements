import { FeaturesBathroomsItem } from './bathrooms'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Features/Bathrooms',
  component: FeaturesBathroomsItem,
  argTypes: {
    value: {
      control: 'number',
    },
  },
} satisfies Meta<typeof FeaturesBathroomsItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    value: 2,
  },
}

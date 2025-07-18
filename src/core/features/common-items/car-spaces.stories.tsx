import { FeaturesCarSpacesItem } from './car-spaces'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Features/CarSpaces',
  component: FeaturesCarSpacesItem,
  argTypes: {
    value: {
      control: 'number',
    },
  },
} satisfies Meta<typeof FeaturesCarSpacesItem>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    value: 2,
  },
}

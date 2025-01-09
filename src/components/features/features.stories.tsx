import type { Meta, StoryObj } from '@storybook/react'

import { Features } from './features'
import { Icon } from '../icon'

const meta = {
  title: 'Components/Features',
  component: Features,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof Features>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({}) => (
    <Features>
      <Features.Item icon={<Icon icon="bed" />}>1</Features.Item>
      <Features.Item icon={<Icon icon="bath" />}>2</Features.Item>
      <Features.Item icon={<Icon icon="car" />}>5</Features.Item>
      <Features.Item icon={<Icon icon="appLauncher" />}>850 sqm</Features.Item>
    </Features>
  ),
}

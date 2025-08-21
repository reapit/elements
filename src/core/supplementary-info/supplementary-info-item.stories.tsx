import { SupplementaryInfoItem } from './supplementary-info-item'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SupplementaryInfoColour } from './supplementary-info-item'

const meta = {
  title: 'Core/SupplementaryInfo/Item',
  component: SupplementaryInfoItem,
  tags: ['autodocs'],
  argTypes: {
    colour: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'neutral',
        'success',
        'pending',
        'warning',
        'danger',
        'accent-1',
        'accent-2',
      ] satisfies SupplementaryInfoColour[],
    },
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <ul data-size="base" style={{ display: 'inline', listStyle: 'none' }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof SupplementaryInfoItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    colour: 'primary',
    children: 'Supplementary info',
  },
}

/**
 * Items can be coloured to convey certain messages or to draw users' attention to certain information.
 */
export const Style: Story = {
  args: {
    ...Example.args,
    colour: 'danger',
  },
}

/**
 * Sibling items will automatically be separated by a dot.
 */
export const Separators: StoryObj = {
  render: () => (
    <>
      <SupplementaryInfoItem>Supplementary info 1</SupplementaryInfoItem>
      <SupplementaryInfoItem>Supplementary info 2</SupplementaryInfoItem>
    </>
  ),
}

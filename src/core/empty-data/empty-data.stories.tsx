import { EmptyData } from './empty-data'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/EmptyData',
  component: EmptyData,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Action only', 'Short description', 'Full description', 'Everything'],
      mapping: {
        'Action only': <EmptyData.ActionButton>Add item</EmptyData.ActionButton>,
        'Short description': <EmptyData.Description>No items found</EmptyData.Description>,
        'Full description': (
          <EmptyData.Description secondaryText="Secondary text">No items found</EmptyData.Description>
        ),
        Everything: (
          <>
            <EmptyData.Description secondaryText="Secondary text">No items found</EmptyData.Description>
            <EmptyData.ActionButton>Add item</EmptyData.ActionButton>
          </>
        ),
      },
    },
    height: {
      control: 'text',
      table: {
        type: {
          summary: '--size-*',
        },
      },
    },
  },
} satisfies Meta<typeof EmptyData>

export default meta
type Story = StoryObj<typeof EmptyData>

export const Example: Story = {
  args: {
    children: 'Everything',
  },
}

/**
 * The element's width will fill the space provided by its parent container.
 */
export const FluidWidth: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * By default, the height of the element will be determined by it's content. In some cases, this
 * may be smaller than desired, so a fixed height (using one of the `--size-*` tokens) can be applied.
 */
export const FixedHeight: Story = {
  args: {
    ...Example.args,
    height: '--size-80',
  },
}

import { Tag } from './tag'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Tag',
  component: Tag,
  argTypes: {
    children: {
      control: 'text',
    },
    maxWidth: {
      control: 'text',
    },
    overflow: {
      control: 'radio',
      options: ['undefined', 'truncate'],
      mapping: {
        undefined: undefined,
        truncate: 'truncate',
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Tag',
    overflow: undefined,
  },
}

/**
 * By default, long labels will overflow if there is not enough space is available.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: "This very long label will overflow because it's parent is not wide enough",
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Truncation is an optional behaviour that can be enabled to prevent the label from
 * wrapping on multiple lines
 */
export const Truncation: Story = {
  args: {
    ...Overflow.args,
    children: 'Truncation can be applied when necessary',
    overflow: 'truncate',
  },
  decorators: Overflow.decorators,
}

/**
 * In some cases, it may be necessary to limit the width of a tag directly, rather than
 * relying on its parent container. Since the default behaviour of the tag's text is to overflow,
 * specifying a maximum width also implies truncation.
 */
export const MaxWidth: Story = {
  args: {
    ...Overflow.args,
    children: 'This tag has its own maximum width constraint',
    maxWidth: '--size-64',
  },
}

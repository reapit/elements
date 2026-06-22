import preview from '#.storybook/preview'
import { Tag } from './tag'

const meta = preview.meta({
  title: 'Indicators and status/Tag',
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
})

export const Example = meta.story({
  args: {
    children: 'Tag',
    overflow: undefined,
  },
})

/**
 * By default, long labels will overflow if there is not enough space is available.
 */
export const Overflow = Example.extend({
  args: {
    children: "This very long label will overflow because it's parent is not wide enough",
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * Truncation is an optional behaviour that can be enabled to prevent the label from
 * wrapping on multiple lines
 */
export const Truncation = Overflow.extend({
  args: {
    children: 'Truncation can be applied when necessary',
    overflow: 'truncate',
  },
  decorators: Overflow.input.decorators,
})

/**
 * In some cases, it may be necessary to limit the width of a tag directly, rather than
 * relying on its parent container. Since the default behaviour of the tag's text is to overflow,
 * specifying a maximum width also implies truncation.
 */
export const MaxWidth = Overflow.extend({
  name: 'Max-width',
  args: {
    children: 'This tag has its own maximum width constraint',
    maxWidth: '--size-64',
  },
})

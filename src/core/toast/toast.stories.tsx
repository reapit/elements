import preview from '#.storybook/preview'
import { Toast } from './toast'
import { MessageIcon } from '#src/icons/message'

const meta = preview.meta({
  title: 'Core/Toast',
  component: Toast,
  argTypes: {
    icon: {
      control: 'radio',
      options: ['None', 'Message'],
      mapping: {
        None: undefined,
        Message: <MessageIcon />,
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'This is a short message',
    duration: undefined,
    variant: 'success',
  },
})

/**
 * Toasts support five variants: `success`, `error`, `warning`, `info`, and `neutral`. The
 * first four variants render a built-in icon. The `neutral` variant accepts an optional
 * `icon` prop — shown here without one.
 */
export const Variants = Example.extend({
  argTypes: {
    variant: { control: false },
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <Toast {...args} variant="success" />
      <Toast {...args} variant="error" />
      <Toast {...args} variant="warning" />
      <Toast {...args} variant="info" />
      <Toast {...args} variant="neutral" />
    </>
  ),
})

/**
 * Toast messages are truncated at two lines. Longer content is clipped with a CSS line
 * clamp.
 */
export const Truncation = Example.extend({
  args: {
    children:
      'This is a much longer message that is intended to exceed the two-line limit so that the truncation behaviour can be observed in the story.',
  },
})

/**
 * The toast's maximum width is 448px (`--size-112`). When placed inside a narrower
 * container, the toast will not overflow — it shrinks to fit the available space.
 */
export const MaxWidth = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children:
      'This message demonstrates how the toast shrinks to fit a narrower container rather than overflowing beyond its boundaries.',
  },
})

/**
 * When a `duration` is provided (in milliseconds), a progress bar animates from zero to
 * full width. The animation is purely visual — DOM removal is the responsibility of the
 * toast provider.
 */
export const TimeoutBar = Example.extend({
  args: {
    duration: 5000,
  },
})

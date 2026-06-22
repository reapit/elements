import preview from '#.storybook/preview'
import { DateTimeControl } from './date-time-control'

const meta = preview.meta({
  title: 'Input and selection/DateTimeControl',
  component: DateTimeControl,
  argTypes: {
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['date', 'datetime-local', 'time'],
    },
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string | number | readonly string[] | undefined',
        },
      },
    },
  },
})

export const Example = meta.story({
  args: {
    defaultValue: '',
    disabled: false,
    errorText: '',
    helpText: '',
    label: 'Label',
    max: undefined,
    min: undefined,
    name: 'myInput',
    readOnly: false,
    required: false,
    showValidity: undefined,
    size: 'medium',
    type: 'date',
    value: undefined,
  },
})

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  args: {
    defaultValue: 'Text',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <DateTimeControl {...args} size="small" />
      <DateTimeControl {...args} size="medium" />
      <DateTimeControl {...args} size="large" />
    </>
  ),
})

/**
 * Optional help text can be provided to give more context about the text input.
 */
export const HelpText = Example.extend({
  args: {
    helpText: 'Optional help text',
  },
})

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: 'Error message',
    required: true,
    showValidity: true,
  },
})

/**
 * Date/time inputs can be disabled. A disabled input will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
})

/**
 * Date/time inputs can be marked as read-only. Unlike disabled inputs, read-only inputs will participate
 * in form submission.
 */
export const Readonly = Example.extend({
  name: 'Read-only',
  args: {
    readOnly: true,
  },
})

/**
 * Date/time inputs can be marked as busy. This is particularly useful when asynchronous validation is being
 * performed on the input's value.
 */
export const Busy = Example.extend({
  args: {
    isBusy: true,
  },
})

/**
 * By default, text inputs will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: 'Max-width',
  args: {
    maxWidth: 'var(--size-64)',
  },
})

/**
 * The label, help text and error text will all wrap naturally when the form control does not have sufficient
 * space available for them.
 */
export const Wrapping = MaxWidth.extend({
  args: {
    label: 'This is a long label that won’t fit on a single line',
    helpText: 'This is a long optional help text that won’t fit on a single line',
  },
})
